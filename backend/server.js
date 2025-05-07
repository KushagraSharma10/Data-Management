import Fastify from "fastify";
import db from "./db.js";
import cors from "@fastify/cors";
const fastify = Fastify({ logger: true });

await fastify.register(cors);
await fastify.register(db);

const collection = fastify.mongo.db.collection("Users");

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

fastify.post("/create", async (request, reply) => {
  const {
    id,
    firstName,
    lastName,
    maidenName,
    age,
    gender,
    email,
    phone,
    username,
    password,
    birthDate,
    image,
    bloodGroup,
    height,
    weight,
    eyeColor,
    hair: { color, type },
    domain,
    ip,
    macAddress,
    university,
    address: {
      address,
      city,
      state,
      postalCode,
      country,
      coordinates: { lat, lng }
    },
    bank: {
      cardExpire,
      cardNumber,
      cardType,
      currency,
      iban
    },
    company: {
      department,
      name,
      title,
      address: {
        address: companyAddress,
        city: companyCity,
        state: companyState,
        postalCode: companyPostalCode,
        coordinates: { lat: companyLat, lng: companyLng }
      }
    },
    ein,
    ssn,
    userAgent,
    crypto: {
      coin,
      wallet,
      network
    },
    role
  } = request.body;

  const newUser = await collection.insertOne({
    id,
    firstName,
    lastName,
    maidenName,
    age,
    gender,
    email,
    phone,
    username,
    password,
    birthDate,
    image,
    bloodGroup,
    height,
    weight,
    eyeColor,
    hair: { color, type },
    domain,
    ip,
    macAddress,
    university,
    address: {
      address,
      city,
      state,
      postalCode,
      country,
      coordinates: { lat, lng }
    },
    bank: {
      cardExpire,
      cardNumber,
      cardType,
      currency,
      iban
    },
    company: {
      department,
      name,
      title,
      address: {
        address: companyAddress,
        city: companyCity,
        state: companyState,
        postalCode: companyPostalCode,
        coordinates: { lat: companyLat, lng: companyLng }
      }
    },
    ein,
    ssn,
    userAgent,
    crypto: {
      coin,
      wallet,
      network
    },
    role
  });

  return reply.status(201).send(newUser);
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
