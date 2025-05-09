import Fastify from "fastify";
import db from "./db.js";
import cors from "@fastify/cors";
const fastify = Fastify({ logger: true });
import yup from 'yup'
import multipart from '@fastify/multipart';
import fs from 'fs';
import path from 'path';
import util from 'util';



const yupOptions = {
  strict: false,
  abortEarly: false, // return all errors
  stripUnknown: true, // remove additional properties
  recursive: true
}


await fastify.register(cors);
await fastify.register(db);
await fastify.register(multipart);

const collection = fastify.mongo.db.collection("Users");


const opt = {
  schema: {
    body:  yup.object().shape({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      maidenName: yup.string().required("Maiden Name is required"),
      age: yup.number().positive("Age must be positive").integer("Age must be an integer").required("Age is required"),
      gender: yup.string().required("Gender is required"),
      email: yup.string().email("Invalid email format").required("Email is required"),
      phone: yup.string().required("Phone is required"),
      username: yup.string().required("Username is required"),
      password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      birthDate: yup.string().required("Birth Date is required"),
      image: yup.string().url("Invalid image URL").required("Image URL is required"),
      bloodGroup: yup.string().required("Blood Group is required"),
      height: yup.number().positive("Height must be positive").required("Height is required"),
      weight: yup.number().positive("Weight must be positive").required("Weight is required"),
      eyeColor: yup.string().required("Eye Color is required"),
      hair: yup.object().shape({
        color: yup.string().required("Hair Color is required"),
        type: yup.string().required("Hair Type is required"),
      }).required("Hair details are required"),
      domain: yup.string().required("Domain is required"),
      ip: yup.string().required("IP Address is required"),
      macAddress: yup.string().required("MAC Address is required"),
      university: yup.string().required("University is required"),
      address: yup.object().shape({
        address: yup.string().required("Address is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        postalCode: yup.string().required("Postal Code is required"),
        country: yup.string().required("Country is required"),
        coordinates: yup.object().shape({
          lat: yup.number().required("Latitude is required"),
          lng: yup.number().required("Longitude is required"),
        }).required("Coordinates are required"),
      }).required("Address is required"),
      bank: yup.object().shape({
        cardExpire: yup.string().required("Card Expiry Date is required"),
        cardNumber: yup.string().required("Card Number is required"),
        cardType: yup.string().required("Card Type is required"),
        currency: yup.string().required("Currency is required"),
        iban: yup.string().required("IBAN is required"),
      }).required("Bank details are required"),
      company: yup.object().shape({
        department: yup.string().required("Department is required"),
        name: yup.string().required("Company Name is required"),
        title: yup.string().required("Job Title is required"),
        address: yup.object().shape({
          address: yup.string().required("Company Address is required"),
          city: yup.string().required("Company City is required"),
          state: yup.string().required("Company State is required"),
          postalCode: yup.string().required("Company Postal Code is required"),
          coordinates: yup.object().shape({
            lat: yup.number().required("Company Latitude is required"),
            lng: yup.number().required("Company Longitude is required"),
          }).required("Company Coordinates are required"),
        }).required("Company Address is required"),
      }).required("Company details are required"),
      ein: yup.string().required("EIN is required"),
      ssn: yup.string().required("SSN is required"),
      userAgent: yup.string().required("User Agent is required"),
      crypto: yup.object().shape({
        coin: yup.string().required("Crypto Coin is required"),
        wallet: yup.string().required("Crypto Wallet is required"),
        network: yup.string().required("Crypto Network is required"),
      }).required("Crypto details are required"),
      role: yup.string().required("Role is required"),
    })
  },
    validatorCompiler: ({ schema, method, url, httpPart }) => {
      return function (data) {
        // with option strict = false, yup `validateSync` function returns the
        // coerced value if validation was successful, or throws if validation failed
        try {
          const result = schema.validateSync(data, yupOptions)
          return { value: result }
        } catch (e) {
          return { error: e }
        }
      }
    }
  
}


fastify.get("/", async (request, reply) => {
  // const query = request.query.query;
  // console.log(query);
  // const result = await collection
  //   .find({
  //     $and: [
  //       {
  //         $or: [
  //           { fullName: { $regex: query, $options: "i" } },
  //           { email: { $regex: query, $options: "i" } },
  //         ],
  //       },
  //       { age: { $lt: 30 } },
  //     ],
  //   })
  //   .toArray();

  //   console.log(result)

  const result = await collection.find().toArray();
  if (!result || result.length === 0) {
    return reply.status(404).send({ message: "No users found" });
  }
  return reply.status(200).send(result);
});

// fastify.post("/create", opt, async (request, reply) => {
//   const {
//     firstName,
//     lastName,
//     maidenName,
//     age,
//     gender,
//     email,
//     phone,
//     username,
//     password,
//     birthDate,
//     image,
//     bloodGroup,
//     height,
//     weight,
//     eyeColor,
//     hair: { color, type },
//     domain,
//     ip,
//     macAddress,
//     university,
//     address: {
//       address,
//       city,
//       state,
//       postalCode,
//       country,
//       coordinates: { lat, lng }
//     },
//     bank: {
//       cardExpire,
//       cardNumber,
//       cardType,
//       currency,
//       iban
//     },
//     company: {
//       department,
//       name,
//       title,
//       address: {
//         address: companyAddress,
//         city: companyCity,
//         state: companyState,
//         postalCode: companyPostalCode,
//         coordinates: { lat: companyLat, lng: companyLng }
//       }
//     },
//     ein,
//     ssn,
//     userAgent,
//     crypto: {
//       coin,
//       wallet,
//       network
//     },
//     role
//   } = request.body;

//   const newUser = await collection.insertOne({
//     firstName,
//     lastName,
//     maidenName,
//     age,
//     gender,
//     email,
//     phone,
//     username,
//     password,
//     birthDate,
//     image,
//     bloodGroup,
//     height,
//     weight,
//     eyeColor,
//     hair: { color, type },
//     domain,
//     ip,
//     macAddress,
//     university,
//     address: {
//       address,
//       city,
//       state,
//       postalCode,
//       country,
//       coordinates: { lat, lng }
//     },
//     bank: {
//       cardExpire,
//       cardNumber,
//       cardType,
//       currency,
//       iban
//     },
//     company: {
//       department,
//       name,
//       title,
//       address: {
//         address: companyAddress,
//         city: companyCity,
//         state: companyState,
//         postalCode: companyPostalCode,
//         coordinates: { lat: companyLat, lng: companyLng }
//       }
//     },
//     ein,
//     ssn,
//     userAgent,
//     crypto: {
//       coin,
//       wallet,
//       network
//     },
//     role
//   });

//   return reply.status(201).send(newUser);
// });

fastify.post("/create", async (request, reply) => {
  console.log("Received data:", request.body); 
  const parts = request.parts();
  const fields = {};
  let imageUrl = "";

  for await (const part of parts) {
    if (part.file) {
      const filename = `${Date.now()}-${part.filename}`;
      const filePath = path.join(uploadDir, filename);
      await pump(part.file, fs.createWriteStream(filePath));
      imageUrl = `/uploads/${filename}`;
    } else {
      fields[part.fieldname] = part.value;
    }
  }

  let parsedData;
  try {
    parsedData = JSON.parse(fields.data); // 'data' field me pura JSON bhej frontend se
  } catch (err) {
    return reply.status(400).send({ error: "Invalid JSON" });
  }

  parsedData.image = imageUrl; // ✅ add uploaded image URL

  // ✅ Use existing Yup validator from `opt`
  try {
    const validated = opt.schema.body.validateSync(parsedData, {
      strict: false,
      abortEarly: false,
      stripUnknown: true
    });



    const result = await collection.insertOne(validated);
    console.log(fields);
    return reply.status(201).send(result);
  } catch (err) {
    return reply.status(400).send({ errors: err.errors });
  }
});


fastify.get("/user/:userId", async (request, reply) => {
  const { userId } = request.params;
  const user = await collection.findOne({
    _id: new fastify.mongo.ObjectId(userId),
  });
  if (!user) {
    return reply.status(404).send({ message: "User not found" });
  }
  return reply.status(200).send(user);
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
