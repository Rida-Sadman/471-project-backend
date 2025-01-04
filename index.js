const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
// const mysql = require("mysql");


const port = 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://turf:KGP0xnYA13ycaczU@cluster0.5oq48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const usersCollection = client.db("Turf").collection("user");
    const notificationCollection = client.db("Turf").collection("notification");
    const turfCollection = client.db("Turf").collection("TurfInfo");
    const bookingCollection = client.db("Turf").collection("booking");
    const holdCollection = client.db("Turf").collection("hold");
    const shopCollection = client.db("Turf").collection("Shop");
    const advertisedCollection = client.db("Turf").collection("advertise");
    const shopOrderCollection = client.db("Turf").collection("ShopOrder");
    const customOrderCollection = client.db("Turf").collection("customOrder");
    const wishlistCollection = client.db("Turf").collection("wishList");


    // const dbUser = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "user",
    // });
    // const dbNotification = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "notification",
    // });
    // const dbTurfInfo = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "TurfInfo",
    // });
    // const dbBooking = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "booking",
    // });
    // const dbHold = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "hold",
    // });
    // const dbShop = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "shop",
    // });
    // const dbAdvertise = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "advertise",
    // });
    // const dbShopOrder = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "shopOrder",
    // });
    // const dbCustomOrder = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "customOrder",
    // });
    // const dbWishlist = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "wishlist",
    // });

    app.get("/users", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      if (req.query.role) {
        query = { role: req.query.role };
      }
    //   const sql =
    // "SELECT * FROM dbUser WHERE `email`= ? OR `role`= ?";
    // dbUser.query(sql, [req.query.email, req.query.role], (err, data) => {
    //   if (err) {
    //     return res.status(500).json("Error Hoyece");
    //   }
    //   if (data.length > 0) {
    //     return res.status(200).json(data);
    //   } else {
    //     return res.status(500).json("Server Error");
    //   }
    // });
      const result = await usersCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
  //     const sql = "INSERT INTO dbUser (name, email, role) VALUES (?, ?, ?)";
  // db.query(sql, [user.name, user.email, user.role], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error adding user");
  //   }
  //   res.status(201).send(result);
  // });
    });
    app.patch("/users/verify", async (req, res) => {
      const email = req.query.email;
      const filter = { email: email };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          varify: "True",
        },
      };
      const result = await usersCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
      // const sql = "UPDATE dbUser SET verified = 'True' WHERE email = ?";
      // db.query(sql, [email], (err, result) => {
      //   if (err) {
      //     return res.status(500).json("Error verifying user");
      //   }
      //   res.send(result);
      // });
    });
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
  //     const sql = "DELETE FROM dbUser WHERE id = ?";
  // db.query(sql, [id], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error deleting user");
  //   }
  //   res.send(result);
  // });
    });

    app.post("/notification", async (req, res) => {
      const msg = req.body;
      const result = await notificationCollection.insertOne(msg);
      res.send(result);
  //     const sql = "INSERT INTO dbNotification (message) VALUES (?, ?)";
  // db.query(sql, [msg], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error adding notification");
  //   }
  //   res.status(201).send(result);
  // });
    });
    app.get("/notification", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      const result = await notificationCollection.find(query).toArray();
      res.send(result);
  //     const sql = "SELECT * FROM dbNotification WHERE email = ?";
  // db.query(sql, [email], (err, results) => {
  //   if (err) {
  //     return res.status(500).json("Error fetching notifications");
  //   }
  //   res.json(results);
  // });
    });
    app.delete("/notification/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await notificationCollection.deleteOne(query);
      res.send(result);
  //     const sql = "DELETE FROM dbNotification WHERE id = ?";
  // db.query(sql, [id], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error deleting notification");
  //   }
  //   res.send(result);
  // });
    });

    
    app.get("/allTurf", async (req, res) => {
      const date = req.query.date;
      let query = {};
      const options = await turfCollection.find(query).toArray();
      const bookingQuery = { bookingDate: date };
      let alreadyBooked = await bookingCollection.find(bookingQuery).toArray();
      const holdData = await holdCollection.find(bookingQuery).toArray();
      alreadyBooked.push(...holdData);
      options.forEach((option) => {
        const optionBooked = alreadyBooked.filter(
          (book) => book.turfName === option.name
        );
        const bookedSlots = optionBooked.map((book) => book.slot);
        const remainingSlots = option.slots.filter(
          (slot) => !bookedSlots.includes(slot)
        );
        option.slots = remainingSlots;
      });
      res.send(options);
      let sql = "SELECT * FROM Turfs";
  // db.query(sql, [], (err, options) => {
  //   if (err) {
  //     return res.status(500).json("Error fetching turfs");
  //   }
  //   let sqlBookings = `SELECT * FROM dbBooking WHERE bookingDate = ?`;
  //   db.query(sqlBookings, [date], (err, bookings) => {
  //     if (err) {
  //       return res.status(500).json("Error fetching bookings");
  //     }
  //     options.forEach(option => {
  //       let bookedSlots = bookings.filter(b => b.turfName === option.name).map(b => b.slot);
  //       option.slots = option.slots.filter(slot => !bookedSlots.includes(slot));
  //     });
  //     res.send(options);
  //   });
  // });
    });
    // search by name start-->
    app.get("/searchTurf", async (req, res) => {
      const date = req.query.date;
      const name = req.query.name;
      const upperCase = name.toUpperCase();
      let query = {
        // name: { $regex: new RegExp(upperCase, "i") },
        name: upperCase,
      };
      const options = await turfCollection.find(query).toArray();
      const bookingQuery = { bookingDate: date };
      const alreadyBooked = await bookingCollection
        .find(bookingQuery)
        .toArray();
      options.forEach((option) => {
        const optionBooked = alreadyBooked.filter(
          (book) => book.turfName === option.name
        );
        const bookedSlots = optionBooked.map((book) => book.slot);
        const remainingSlots = option.slots.filter(
          (slot) => !bookedSlots.includes(slot)
        );
        option.slots = remainingSlots;
      });
      res.send(options);
      console.log("t", options);
      // let sql = "SELECT * FROM dbTurfInfo WHERE name LIKE ?";
  // db.query(sql, [`%${name}%`], (err, options) => {
  //   if (err) {
  //     return res.status(500).json("Error searching turfs");
  //   }
  //   let sqlBookings = "SELECT * FROM dbBooking WHERE bookingDate = ? AND turfName LIKE ?";
  //   db.query(sqlBookings, [date, `%${name}%`], (err, bookings) => {
  //     if (err) {
  //       return res.status(500).json("Error fetching bookings for search");
  //     }
  //     options.forEach(option => {
  //       let bookedSlots = bookings.filter(b => b.turfName === option.name).map(b => b.slot);
  //       option.slots = option.slots.filter(slot => !bookedSlots.includes(slot));
  //     });
  //     res.send(options);
  //   });
  // });
    });
    // search by name end--->
    // search by location start-->
    app.get("/searchLocation", async (req, res) => {
      const date = req.query.date;
      const location = req.query.location;
      let query = {
        location: location,
      };
      const options = await turfCollection.find(query).toArray();
      const bookingQuery = { bookingDate: date };
      const alreadyBooked = await bookingCollection
        .find(bookingQuery)
        .toArray();
      options.forEach((option) => {
        const optionBooked = alreadyBooked.filter(
          (book) => book.turfName === option.name
        );
        const bookedSlots = optionBooked.map((book) => book.slot);
        const remainingSlots = option.slots.filter(
          (slot) => !bookedSlots.includes(slot)
        );
        option.slots = remainingSlots;
      });
      console.log(options);
      res.send(options);
      // let sql = "SELECT * FROM dbTurfInfo WHERE location = ?";
  // db.query(sql, [location], (err, options) => {
  //   if (err) {
  //     return res.status(500).json("Error searching turfs by location");
  //   }
  //   let sqlBookings = "SELECT * FROM dbBooking WHERE bookingDate = ?";
  //   db.query(sqlBookings, [date], (err, bookings) => {
  //     if (err) {
  //       return res.status(500).json("Error fetching bookings for location search");
  //     }
  //     options.forEach(option => {
  //       let bookedSlots = bookings.filter(b => b.turfName === option.name).map(b => b.slot);
  //       option.slots = option.slots.filter(slot => !bookedSlots.includes(slot));
  //     });
  //     res.send(options);
  //   });
  // });
    });
    // search by location end--->
    app.post("/booking", async (req, res) => {
      const data = req.body;
      const result = await bookingCollection.insertOne(data);
      res.send(result);
      console.log(result);

      // let sql = "INSERT INTO dbBooking (userId, turfId, date, slot) VALUES (?, ?, ?, ?)";
      // db.query(sql, [userId, turfId, date, slot], (err, result) => {
      //   if (err) {
      //     return res.status(500).json("Error adding booking");
      //   }
      //   res.send(result);
      // });
    });

    // hold start-->
    app.post("/hold", async (req, res) => {
      const data = req.body;
      data.createdAt = new Date();

      const result = await holdCollection.insertOne(data);
      cleanupJob.start();

      res.send(result);

  //     let sql = "INSERT INTO dbHold (userId, turfId, slot, date, createdAt) VALUES (?, ?, ?, ?, ?)";
  // db.query(sql, [userId, turfId, slot, date, createdAt], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error adding hold");
  //   }
  //   res.send(result);
  // });
    });
    app.get("/hold", async (req, res) => {
      let query = {};
      if (req.query.customerEmail) {
        query = { email: req.query.customerEmail };
      }
      const result = await holdCollection.find(query).toArray();
      res.send(result);

      //     const sql = "SELECT * FROM dbHold WHERE email = ?";
  // db.query(sql, [req.query.customerEmail], (err, results) => {
  //   if (err) {
  //     return res.status(500).json("Error fetching notifications");
  //   }
  //   res.json(results);
  // });
    });
    app.delete("/hold/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await holdCollection.deleteOne(query);
      res.send(result);
      //     const sql = "DELETE FROM dbHold WHERE _id = ?";
  // db.query(sql, [new objectId], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error deleting notification");
  //   }
  //   res.send(result);
  // });
    });
    const cleanupJob = cron.schedule(
      "*/1 * * * *",
      async () => {
        const thirtySecondsAgo = new Date();
        thirtySecondsAgo.setSeconds(thirtySecondsAgo.getSeconds() - 30);

        try {
          // Find and remove documents older than 30 seconds
          const result = await holdCollection.deleteMany({
            createdAt: { $lt: thirtySecondsAgo },
          });
          console.log(`${result.deletedCount} document(s) deleted.`);
        } catch (error) {
          console.error("Error deleting documents:", error);
        }
      },
      {
        scheduled: false, // The job will not run immediately after scheduling
      }
    );

   
    app.get("/booking", async (req, res) => {
      let query = {};
      if (req.query.customerEmail) {
        query = { email: req.query.customerEmail };
      }
      const result = await bookingCollection.find(query).toArray();
      res.send(result);
  //     let sql = "SELECT * FROM dbBooking WHERE email = ?";
  // db.query(sql, [req.query.customerEmail], (err, results) => {
  //   if (err) {
  //     return res.status(500).json("Error fetching bookings");
  //   }
  //   res.send(results);
  // });
    });
    app.patch("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          gameStatus: "over",
        },
      };
      const result = await bookingCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
      console.log(result);

  //     const sql = "UPDATE dbBooking SET gameStatus = 'over' WHERE id = ?";
  // db.query(sql, [filter], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error updating booking status");
  //   }
  //   res.send(result);
  //   console.log(result);
  // });
    });
    app.delete("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
      // let sql = "DELETE FROM dbBooking WHERE _id = ?";
      // db.query(sql, [new objectID(id)], (err, result) => {
      //   if (err) {
      //     return res.status(500).json("Error deleting booking");
      //   }
      //   res.send(result);
      // });
    });

    app.get("/bookedData", async (req, res) => {
      let query = {};
      const queryName = req.query.name;
      const updateName = queryName.toUpperCase();
      if (queryName) {
        query = { turfName: updateName };
        console.log(query);
      }
      const result = await bookingCollection.find(query).toArray();
      res.send(result);

  //     let sql = "SELECT * FROM dbBooking WHERE turfName LIKE ?";
  // db.query(sql, [updateName], (err, results) => {
  //   if (err) {
  //     return res.status(500).json("Error fetching booked data");
  //   }
  //   res.send(results);
  //   console.log("Query:", sql);
  // });
    });

    app.get("/advertise", async (req, res) => {
      let query = {};
      if (req.query.productId) {
        query = { productId: req.query.productId };
      }
      const result = await advertisedCollection.find(query).toArray();
      res.send(result);

  //     let sql = "SELECT * FROM dbAdvertise WHERE productId = ?";
  // db.query(sql, [req.query.productId], (err, results) => {
  //   if (err) {
  //     return res.status(500).json("Error fetching advertisements");
  //   }
  //   res.send(results);
  // });
    });
    app.post("/advertise", async (req, res) => {
      const wishList = req.body;
      const result = await advertisedCollection.insertOne(wishList);
      console.log(result);
      res.send(result);
  //     let sql = "INSERT INTO dbAdvertise (message) VALUES (?, ?)";
  // db.query(sql, [wishList], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error posting advertisement");
  //   }
  //   res.send(result);
  //   console.log(result);
  // });
    });
    app.delete("/advertise/:id", async (req, res) => {
      const id = req.params.id;
      const query = { productId: id };
      const result = await advertisedCollection.deleteOne(query);
      res.send(result);
  //     let sql = "DELETE FROM dbAdvertise WHERE productId = ?";
  // db.query(sql, [id], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error deleting advertisement");
  //   }
  //   res.send(result);
  // });
    });

    app.get("/turfCollection", async (req, res) => {
      let query = {};
      if (req.query.name) {
        query = {
          name: req.query.name,
        };
      }
      const result = await turfCollection.find(query).toArray();
      res.send(result);

  //     let sql = name ? "SELECT * FROM dbTurfInfo WHERE name LIKE ?" : "SELECT * FROM TurfCollection";
  // db.query(sql, [req.query.name], (err, results) => {
  //   if (err) {
  //     return res.status(500).json("Error fetching turfs");
  //   }
  //   res.send(results);
  // });
    });
    app.get("/turfCollection/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await turfCollection.findOne(query);
      console.log(result);
      res.send(result);

  //     let sql = "SELECT * FROM dbTurfInfo WHERE _id = ?";
  // db.query(sql, [new objectId(id)], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error fetching turf by id");
  //   }
  //   res.send(result);
  //   console.log(result);
  // });
    });

    app.patch("/turfCollection/:id", async (req, res) => {
      const id = req.params.id;
      let query = {};
      const options = { upsert: true };
      let updatedDoc = {
        $set: {},
      };
      if (req.body.data) {
        console.log(req.body.data);
        query = { _id: new ObjectId(id) };
        updatedDoc = {
          $set: {
            discount: req.body.data.discount,
            promo: req.body.data.promo,
          },
        };
      }
      if (req.body.advertise) {
        query = { _id: new ObjectId(id) };

        updatedDoc = {
          $set: {
            advertise: req.body.advertise,
          },
        };
      }
      const result = await turfCollection.updateOne(query, updatedDoc, options);
      res.send(result);
      console.log(result);

  //     let sql = "UPDATE dbTurfInfo SET discount = ?, promo = ?, advertise = ? WHERE _id = ?";
  // db.query(sql, [discount, promo, advertise, new objectID(id)], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error updating turf info");
  //   }
  //   res.send(result);
  //   console.log(result);
  // });
    });
    app.delete("/turfCollection/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await turfCollection.deleteOne(query);
      res.send(result);

  //     let sql = "DELETE FROM dbTurfInfo WHERE _id = ?";
  // db.query(sql, [new objectId(id)], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error deleting turf");
  //   }
  //   res.send(result);
  // });
    });

  
    /* display all shop product */
    app.get("/shop", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      const result = await shopCollection.find(query).toArray();
      res.send(result);

  //     let sql = email ? "SELECT * FROM dbShop WHERE email = ?" : "SELECT * FROM dbShop";
  // db.query(sql, [req.query.email], (err, results) => {
  //   if (err) {
  //     return res.status(500).json("Error fetching products");
  //   }
  //   res.send(results);
  // });
    });
    /* display specific id product to show specific info of a product in cart */
    app.get("/shop/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await shopCollection.findOne(query);
      console.log(result);
      res.send(result);

      // let sql = "SELECT * FROM dbShop WHERE _id = ?";

      // db.query(sql, [new objectId(id)], (err, result) => {
      //   if (err) {
      //     return res.status(500).json("Error fetching product details");
      //   }
      //   res.send(result);
      //   console.log(result);
      // });
    });
    /* insert shop data */
    app.post("/shop", async (req, res) => {
      const data = req.body;
      const result = await shopCollection.insertOne(data);
      res.send(result);

  //     let sql = "INSERT INTO dbShop (email, description, productPrice, stock) VALUES (?, ?, ?, ?)";
  // db.query(sql, [email, description, productPrice, stock], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error adding new product");
  //   }
  //   res.send(result);
  // });
    });
    /* update shop product info */
    app.patch("/shop/:id", async (req, res) => {
      const id = req.params.id;
      let query = {};
      const options = { upsert: true };
      let updatedDoc = {
        $set: {},
      };
      if (req.body.data) {
        console.log(req.body.data);
        query = { _id: new ObjectId(id) };
        updatedDoc = {
          $set: {
            description: req.body.data.description,
            productPrice: req.body.data.productPrice,
            stock: req.body.data.stock,
          },
        };
      }
      if (req.body.advertise) {
        query = { _id: new ObjectId(id) };

        updatedDoc = {
          $set: {
            advertise: req.body.advertise,
          },
        };
      }
      if (req.body.stock !== undefined) {
        query = { _id: new ObjectId(id) };
        if (req.body.stock === 0) {
          updatedDoc = {
            $set: {
              stock: "0",
            },
          };
        } else {
          updatedDoc = {
            $set: {
              stock: req.body.stock,
            },
          };
        }
      }
      const result = await shopCollection.updateOne(query, updatedDoc, options);
      res.send(result);
      console.log(result);

  //     let sql = "UPDATE dbShop SET description = ?, productPrice = ?, stock = ?, advertise = ? WHERE id = ?";
  // db.query(sql, [description, productPrice, stock, advertise, id], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error updating product info");
  //   }
  //   res.send(result);
  //   console.log(result);
  // });
    });

    app.delete("/shop/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await shopCollection.deleteOne(query);
      res.send(result);

  //     let sql = "DELETE FROM dbShop WHERE _id = ?";
  // db.query(sql, [new objectId(id)], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error deleting product");
  //   }
  //   res.send(result);
  // });
    });
    /* search by name */
    app.get("/searchProduct", async (req, res) => {
      const name = req.query.name;
      const upperCase = name.toUpperCase();
      let query = {
        // name: { $regex: new RegExp(upperCase, "i") },
        productName: upperCase,
      };
      const options = await shopCollection.find(query).toArray();
      res.send(options);

  //     let sql = "SELECT * FROM dbShop WHERE productName LIKE ?";
  // db.query(sql, [upperCase], (err, options) => {
  //   if (err) {
  //     return res.status(500).json("Error searching products by name");
  //   }
  //   res.send(options);
  // });
    });
    /* search by category */
    app.get("/searchProductCategory", async (req, res) => {
      const category = req.query.category;
      let query = {
        category: category,
      };
      const options = await shopCollection.find(query).toArray();
      res.send(options);

      // let sql = "SELECT * FROM dbShop WHERE category = ?";
      // db.query(sql, [category], (err, options) => {
      //   if (err) {
      //     return res.status(500).json("Error searching products by category");
      //   }
      //   res.send(options);
      // });
    });
    /* get ordered product */
    app.get("/shopOrder", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      const result = await shopOrderCollection.find(query).toArray();
      res.send(result);

  //     let sql = "SELECT * FROM dbShopOrder WHERE email = ?";
  // db.query(sql, [req.query.email], (err, results) => {
  //   if (err) {
  //     return res.status(500).json("Error fetching orders");
  //   }
  //   res.send(results);
  // });
    });
    /* insert a order */
    app.post("/shopOrder", async (req, res) => {
      const data = req.body;
      const result = await shopOrderCollection.insertOne(data);
      res.send(result);

  //     let sql = "INSERT INTO dbShopOrder (email, productId, quantity) VALUES (?, ?, ?)";
  // db.query(sql, [req.body.email, req.body.productId, req.body.quantity], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error placing order");
  //   }
  //   res.send(result);
  // });
    });
    /* get specific ordered data */
    app.delete("/shopOrder/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await shopOrderCollection.deleteOne(query);
      res.send(result);
  //     let sql = "DELETE FROM dbShopOrder WHERE _id = ?";
  // db.query(sql, [new objectId(id)], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error deleting order");
  //   }
  //   res.send(result);
  // });
    });
    /* get customer data */
    app.get("/customOrder", async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = { email: req.query.email };
      }
      const result = await customOrderCollection.find(query).toArray();
      res.send(result);
      // let sql = "SELECT * FROM dbCustomOrder WHERE email = ?";

      // db.query(sql, [req.query.email], (err, results) => {
      //   if (err) {
      //     return res.status(500).json("Error fetching custom orders");
      //   }
      //   res.send(results);
      // });
    });
    /* insert cutomer order data */
    app.post("/customOrder", async (req, res) => {
      const data = req.body;
      const result = await customOrderCollection.insertOne(data);
      res.send(result);
  //     let sql = "INSERT INTO dbCustomOrder (email, orderDetails, status) VALUES (?, ?, ?)";
  // db.query(sql, [req.query.email, req.query.orderDetails, req.query.status], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error inserting custom order");
  //   }
  //   res.send(result);
  // });
    });

    /* update customer order data */
    app.patch("/customOrder/:id", async (req, res) => {
      const id = req.params.id;
      let query = {};
      const options = { upsert: true };
      let updatedDoc = {
        $set: {},
      };
      if (req.body.approval) {
        query = { _id: new ObjectId(id) };
        updatedDoc = {
          $set: {
            approval: req.body.approval,
          },
        };
      }

      const result = await customOrderCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send(result);
      console.log(result);

  //     let sql = "UPDATE dbCustomOrder SET approval = ? WHERE id = ?";
  // db.query(sql, [approval, id], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error updating custom order");
  //   }
  //   res.send(result);
  //   console.log(result);
  // });
    });
    app.delete("/customOrder/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await customOrderCollection.deleteOne(query);
      res.send(result);

  //     let sql = "DELETE FROM dbCustomOrder WHERE _id = ?";
  // db.query(sql, [new objectId(id)], (err, result) => {
  //   if (err) {
  //     return res.status(500).json("Error deleting custom order");
  //   }
  //   res.send(result);
  // });
    });
  } finally {
  }
}
run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("Turf server is running");
});

app.listen(port, () => console.log(`Turf server is running on ${port}`));
