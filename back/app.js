const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  logger = require("morgan"),
  cors = require("cors");

  require("dotenv").config();


const WeeklySchedule = require("./models/weeklySchedule.model");
const PointOfSale = require("./models/pointOfSale.model");



const apiRouter = require("./routes/index");

const app = express();

let isProduction = process.env.NODE_ENV === "production";

const BUILD_PATH = "/media";


//-------------- DB Config --------------//
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log("database connected successfuly");
});
mongoose.connection.on("error", err => {
  console.error(`Failed to connect to the database: ${err}`);
});

if (!isProduction) {
  mongoose.set("debug", true);
}
//-------------- Middlewares --------------//
app.use(logger("dev"));

// app.use('/media', express.static('media'));

app.use(
  "/media",
  express.static("media", {
    extensions: ["html"],
    setHeaders(res, path) {
      if (path.match(/(\.html|\/sw\.js)$/)) {
        setNoCache(res);
        return;
      }

      if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
        setLongTermCache(res);
      }
    }
  })
);

app.use(
  "/data",
  express.static("data", {
    extensions: ["html"],
    setHeaders(res, path) {
      if (path.match(/(\.html|\/sw\.js)$/)) {
        setNoCache(res);
        return;
      }

      if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
        setLongTermCache(res);
      }
    }
  })
);

const whitelist = process.env.CROS_ALLOW || "*";

const corsOptions = {
  origin: function (origin, callback) {
    console.log(`origin ____________`, origin);
    if (whitelist.indexOf(origin) !== -1 || whitelist.indexOf("*") !== -1) {
      callback(null, true);
    } else {
      const err = new Error("Access Denied ");
      err.status = 403;
      callback(err);
    }
  }
};


app.use(cors(corsOptions));

// app.use(express.urlencoded());
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

//-------------- Routes --------------//

app.use('/', apiRouter);  



// app.use("/",async(req,res)=>{

//   const { id } = {"id":"627a726cbddda3fe7f6897a8"}

//     console.log("================================================")

//     const pos = await WeeklySchedule.findById(id);

//     console.log('pos', pos)
//     res.send({
//       success: true,
//       result: pos,
//     });})



// app.use("/", async (req, res) => {
//   const { id } = { "id": "627a726cbddda3fe7f6897a8" };

//   try {
//       const weeklySchedule = await WeeklySchedule.findById(id).populate('pointOfSale');
//       const pointOfSaleId = weeklySchedule.pointOfSale;
//       const pointOfSale = await PointOfSale.findById(pointOfSaleId);

//       res.send({
//           success: true,
//           result: {
//               weeklySchedule: weeklySchedule,
//               pointOfSale: pointOfSale
//           }
//       });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send({
//           success: false,
//           message: 'Internal Server Error'
//       });
//   }
// });




//-------------- ERRORS --------------//
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Error processing your request";
  const codeError =
    err.codeError || err.code || err._message || "API_ERROR_NOT_ALLOWED";
  // const ip = get_ip(req);

  console.log("------------------- ERR --------------------");
  console.log(err);
  // console.log("IP", ip.clientIp);
  console.log("--------------------------------------------");

  res.status(status).send({ message, codeError });
});

// module.exports = app;




const server = require("http").createServer(app);

const PORT = process.env.PORT || 9900;

server.listen(PORT, () => {
  console.log(`Server is ready for connections on port ${PORT} `);
});