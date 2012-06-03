using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.Common;
using System.Data.SQLite;
using System.Xml;
using System.IO;
using GeoCoding;
using GeoCoding.Google;

namespace AcornHousing
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create a connection and a command
            using (SQLiteConnection cnn = new SQLiteConnection("Data Source=investigations.db3"))
            using (SQLiteCommand cmd = cnn.CreateCommand())
            {
                // Open the connection. If the database doesn't exist,
                // it will be created automatically
                cnn.Open();
                // Create a table in the database
                cmd.CommandText = "CREATE TABLE Address (line VARCHAR(100), house VARCHAR(100), " +
                    "street VARCHAR(100), type VARCHAR(100), direction VARCHAR(100), lat NUMERIC, long NUMERIC)";
                cmd.ExecuteNonQuery();

                cmd.CommandText = "CREATE TABLE Investigation (inNum VARCHAR(100), inDate VARCHAR(100)," +
                    "noticeDate VARCHAR(100), nextInDate VARCHAR(100), expiryDate VARCHAR(100)," +
                    " issue VARCHAR(100), status VARCHAR(100), addressId INTEGER, FOREIGN KEY(addressId)" +
                    " REFERENCES Address(addressId))";
                cmd.ExecuteNonQuery();

                cmd.CommandText = "CREATE TABLE Deficiencies (investigationId INTEGER, " +
                    "location VARCHAR(100), desc VARCHAR(100), status VARCHAR(100), "+
                    "FOREIGN KEY(investigationId) REFERENCES Investigation(investigationId))";
                cmd.ExecuteNonQuery();

                IGeoCoder geoCoder = new GoogleGeoCoder("42");

                int NumDeficienciesRead = 0;

                using (XmlReader reader = XmlReader.Create(new FileStream(@"../../investigation.xml", FileMode.Open)))
                {
                    while (reader.ReadToFollowing("INVESTIGATION")/* && NumDeficienciesRead < 100*/)
                    {
                        ReadInvestigation(reader.ReadSubtree(), cmd, geoCoder);
                        NumDeficienciesRead++;
                        if (NumDeficienciesRead % 100 == 0)
                        {
                            Console.WriteLine(NumDeficienciesRead.ToString());
                        }
                    }

                }

            }
        }

        static public void ReadInvestigation(XmlReader investigationReader, SQLiteCommand cmd, IGeoCoder geoCoder)
        {


            string inNum = "";
            string inDate = "";
            string noticeDate = "";
            string nextInDate = "";
            string expiryDate = "";
            string issue = "";
            string status = "";
            Address addr = null;
            List<Deficiency> deficiencyList = null;

            //Read investigation element
            investigationReader.Read();

            while (investigationReader.Read())
            {
                if (investigationReader.NodeType == XmlNodeType.Element)
                {
                    string elementName = investigationReader.Name;

                    //Skip elements that have no text content. eg. <date/>
                    if(investigationReader.IsEmptyElement)
                    {
                        continue;
                    }

                    switch (elementName)
                    {
                        case "InNum":
                        {
                            break;
                        }
                        case "InType":
                        {
                            //Reat to text content
                            investigationReader.Read();

                            string inType = investigationReader.Value;
                            if (inType != "Order Issued Property Standards")
                            {
                                return;
                            }
                            break;
                        }
                        case "InDate":
                        {
                            //Reat to text content
                            investigationReader.Read();

                            inDate = investigationReader.Value;
                            break;
                        }
                        case "NoticeDate":
                        {
                            //Reat to text content
                            investigationReader.Read();

                            noticeDate = investigationReader.Value;
                            break;
                        }
                        case "NextInDate":
                        {
                            //Reat to text content
                            investigationReader.Read();

                            nextInDate = investigationReader.Value;
                            break;
                        }
                        case "ExpiryDate":
                        {
                            //Reat to text content
                            investigationReader.Read();

                            expiryDate = investigationReader.Value;
                            break;
                        }
                        case "Issue":
                        {
                            //Reat to text content
                            investigationReader.Read();

                            issue = investigationReader.Value;
                            break;
                        }
                        case "Status":
                        {
                            //Reat to text content
                            investigationReader.Read();

                            status = investigationReader.Value;
                            break;
                        }
                        case "Addresses":
                        {
                            addr = ReadAddress(investigationReader.ReadSubtree(), geoCoder);
                            break;
                        }
                        case "Deficiencies":
                        {
                            deficiencyList = ReadDeficiencies(investigationReader.ReadSubtree());
                            break;
                        }

                    }
                }
            }

            //Insert entry into sql

            long addrId = -1;

            cmd.CommandText = "SELECT ROWID FROM Address WHERE line = \"" + addr.addrLine + "\"";
            SQLiteDataReader dupAddrReader = cmd.ExecuteReader();
            if (dupAddrReader.Read())
            {
                addrId = (long)dupAddrReader["ROWID"];
            }
            dupAddrReader.Close();

            if (addrId == -1)
            {
                cmd.CommandText = "INSERT INTO Address VALUES(" +
                    "\"" + addr.addrLine + "\", " +
                    "\"" + addr.houseNumber + "\", " +
                    "\"" + addr.street + "\", " +
                    "\"" + addr.streetType + "\", " +
                    "\"" + addr.streetDirection + "\", " +
                    addr.latCoord.ToString() + ", " +
                    addr.longCoord.ToString() +
                    ")";
                cmd.ExecuteNonQuery();

                cmd.CommandText = "SELECT last_insert_rowid()";
                SQLiteDataReader addrIdReader = cmd.ExecuteReader();
                while (addrIdReader.Read())
                {
                    addrId = (long)addrIdReader[0];
                }
                addrIdReader.Close();
            }

            cmd.CommandText = "INSERT INTO Investigation VALUES(" +
                "\"" + inNum +"\", " +
                "\"" + inDate + "\", " +
                "\"" + noticeDate + "\", " +
                "\"" + nextInDate + "\", " +
                "\"" + expiryDate + "\", " +
                "\"" + issue + "\", " +
                "\"" + status +"\", " +
                addrId.ToString() +
                ")";
            cmd.ExecuteNonQuery();

            long investigationId = -1;
            cmd.CommandText = "SELECT last_insert_rowid()";
            SQLiteDataReader investigationIdReader = cmd.ExecuteReader();
            while (investigationIdReader.Read())
            {
                investigationId = (long)investigationIdReader[0];
            }
            investigationIdReader.Close();

            if (deficiencyList != null)
            {
                foreach(Deficiency curDeficiency in deficiencyList)
                {
                    cmd.CommandText = "INSERT INTO Deficiencies VALUES(" +
                        investigationId.ToString() + ", " +
                        "\"" + curDeficiency.location + "\", " +
                        "\"" + curDeficiency.description.Replace('"', '\'') + "\", " +
                        "\"" + curDeficiency.status + "\"" +
                        ")";
                    cmd.ExecuteNonQuery();
                }
            }
        }

        static public Address ReadAddress(XmlReader addressReader, IGeoCoder geoCoder)
        {
            Address addr = new Address();
            
            addressReader.ReadToFollowing("Address");

            while (addressReader.Read())
            {
                if (addressReader.NodeType == XmlNodeType.Element)
                {
                    string elementName = addressReader.Name;

                    //Skip elements that have no text content. eg. <date/>
                    if (addressReader.IsEmptyElement)
                    {
                        continue;
                    }

                    //Reat to text content
                    addressReader.Read();

                    switch (elementName)
                    {
                        case "AddrLine":
                            {
                                addr.addrLine = addressReader.Value;

                                GeoCoding.Address[] addresses = geoCoder.GeoCode(addr.addrLine + "Toronto Canada");
                                if (addresses.Length != 0)
                                {
                                    addr.latCoord = addresses[0].Coordinates.Latitude;
                                    addr.longCoord = addresses[0].Coordinates.Longitude;
                                }

                                break;
                            }
                        case "House":
                            {
                                addr.houseNumber = addressReader.Value;
                                break;
                            }
                        case "Street":
                            {
                                addr.street = addressReader.Value;
                                break;
                            }
                        case "Type":
                            {
                                addr.streetType = addressReader.Value;
                                break;
                            }
                        case "Direction":
                            {
                                addr.streetDirection = addressReader.Value;
                                break;
                            }
                    }
                }
            }

            return addr;
        }

        static public List<Deficiency> ReadDeficiencies(XmlReader deficienciesReader)
        {
            List<Deficiency> deficiencyList = new List<Deficiency>();
            
            while (deficienciesReader.ReadToFollowing("Deficiency"))
            {
                deficiencyList.Add( ReadDeficiency(deficienciesReader.ReadSubtree()) );
            }

            return deficiencyList;
        }

        static public Deficiency ReadDeficiency(XmlReader deficiencyReader)
        {
            Deficiency deficiency = new Deficiency();

            deficiencyReader.ReadToFollowing("Deficiency");

            while (deficiencyReader.Read())
            {
                if (deficiencyReader.NodeType == XmlNodeType.Element)
                {
                    string elementName = deficiencyReader.Name;

                    //Skip elements that have no text content. eg. <date/>
                    if (deficiencyReader.IsEmptyElement)
                    {
                        continue;
                    }

                    //Reat to text content
                    deficiencyReader.Read();

                    switch (elementName)
                    {
                        case "Location":
                            {
                                deficiency.location = deficiencyReader.Value;
                                break;
                            }
                        case "Desc":
                            {
                                deficiency.description = deficiencyReader.Value;
                                break;
                            }
                        case "Status":
                            {
                                deficiency.status = deficiencyReader.Value;
                                break;
                            }
                    }
                }
            }

            return deficiency;

        }

    }
}
