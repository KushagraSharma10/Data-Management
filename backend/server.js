import Fastify from "fastify";
import db from "./db.js";
import cors from "@fastify/cors";
const fastify = Fastify({ logger: true });
import yup from 'yup'
import multipart from '@fastify/multipart';
import fs from 'node:fs';
import path from 'path';
import { pipeline } from 'node:stream/promises';
import fastifyStatic from '@fastify/static';
import { nanoid } from 'nanoid'


const yupOptions = {
  strict: false,
  abortEarly: false, // return all errors
  stripUnknown: true, // remove additional properties
  recursive: true
}

await fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), 'uploads'),
  prefix: '/uploads/',
});

await fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

await fastify.register(db);

await fastify.register(multipart,{
  attachFieldsToBody: false,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },


});

const collection = fastify.mongo.db.collection("Users");
const blogCollection = fastify.mongo.db.collection("Blogs");
const tagCollection = fastify.mongo.db.collection("Tags");
const categoriesCollection = fastify.mongo.db.collection("Categories");

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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
      image: yup.string(), 
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

fastify.post("/create", async (request, reply) => {
  const data = {};
  let imageFilename = null;

  const parts = request.parts();
  for await (const part of parts) {
    if (part.file) {
      // Handle file upload
      imageFilename = `${Date.now()}-${part.filename}`;
      const filePath = path.join(uploadDir, imageFilename);
      await pipeline(part.file, fs.createWriteStream(filePath));
    } else if (part.fieldname === 'data') {
      try {
        Object.assign(data, JSON.parse(part.value));
        console.log("Parsed data on server:", data);
      } catch (err) {
        return reply.status(400).send({ error: "Invalid JSON data" });
      }
    }
  }

  // Only add image URL if image is present
  if (imageFilename) {
    data.image = `http://localhost:3000/uploads/${imageFilename}`;
  }

  try {
    const validated = opt.schema.body.validateSync(data, {
      strict: false,
      abortEarly: false,
      stripUnknown: true
    });

    const result = await collection.insertOne(validated);
    return reply.status(201).send(result);
  } catch (err) {
    console.error("Validation error:", err);
    return reply.status(400).send({ errors: err.errors || err.message });
  }
});


fastify.post("/upload/file", async(req,reply)=>{
  const file = await req.file();

  const path = `${nanoid()}.${data.filename.split('.').pop()}`;
  await pipeline(data.file, fs.createWriteStream(path))
  reply.send({data:file ,status:200,message: "File uploaded successfully"})
})


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

fastify.get("/blogs", async (request, reply) => {
  try {
    const blogs = await blogCollection.find().toArray();
    return reply.status(200).send(blogs);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
});


// fastify.post("/blogs", async (request, reply) => {
//   const blog = {};
//   let imageFilename = null;

//   const parts = request.parts();
//   for await (const part of parts) {
//     if (part.file) {
//       imageFilename = `${Date.now()}-${part.filename}`;
//       const filePath = path.join(uploadDir, imageFilename);
//       await pipeline(part.file, fs.createWriteStream(filePath));
//     } else {
//       blog[part.fieldname] = part.value;
//     }
//   }

//   if (imageFilename) {
//     blog.image = `http://localhost:3000/uploads/${imageFilename}`;
//   }

//   // 🕒 Add timestamps
//   blog.createdAt = new Date();
//   blog.updatedAt = new Date();

//   try {
//     const result = await blogCollection.insertOne(blog);
//     blog._id = result.insertedId;
//     return reply.status(201).send({ data: blog, message: "Blog created", result });
//   } catch (err) {
//     return reply.status(500).send({ error: err.message });
//   }
// });


fastify.post("/blogs", async (request, reply) => {
  const blog = {};
  let imageFilename = null;

  const parts = request.parts();
  for await (const part of parts) {
    if (part.file) {
      imageFilename = `${Date.now()}-${part.filename}`;
      const filePath = path.join(uploadDir, imageFilename);
      await pipeline(part.file, fs.createWriteStream(filePath));
    } else {
      // part.value is always string, parse tags if needed
      if (part.fieldname === "tags") {
        try {
          blog.tags = JSON.parse(part.value);
        } catch {
          blog.tags = part.value; // fallback if not JSON
        }
      } else {
        blog[part.fieldname] = part.value;
      }
    }
  }

  if (imageFilename) {
    blog.image = `http://localhost:3000/uploads/${imageFilename}`;
  }

  blog.createdAt = new Date();
  blog.updatedAt = new Date();

  try {
    const result = await blogCollection.insertOne(blog);
    blog._id = result.insertedId;
    return reply.status(201).send({ data: blog, message: "Blog created", result });
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
});


fastify.put("/blogs/:blogId", async (request, reply) => {
  const { blogId } = request.params;
  const updatedData = {};
  let imageFilename = null;

  const parts = request.parts();
  for await (const part of parts) {
    if (part.file) {
      imageFilename = `${Date.now()}-${part.filename}`;
      const filePath = path.join(uploadDir, imageFilename);
      await pipeline(part.file, fs.createWriteStream(filePath));
    } else {
      updatedData[part.fieldname] = part.value;
    }
  }

  if (imageFilename) {
    updatedData.image = `http://localhost:3000/uploads/${imageFilename}`;
  }

  // 🕒 Update timestamp
  updatedData.updatedAt = new Date();

  try {
    const result = await blogCollection.updateOne(
      { _id: new fastify.mongo.ObjectId(blogId) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return reply.status(404).send({ message: "Blog not found" });
    }

    return reply.status(200).send({ message: "Blog updated successfully" });
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
});


fastify.get("/blogs/:blogId", async (request, reply) => {
  const { blogId } = request.params;

  try {
    const blog = await blogCollection.findOne({
      _id: new fastify.mongo.ObjectId(blogId),
    });

    if (!blog) {
      return reply.status(404).send({ message: "Blog not found" });
    }

    return reply.status(200).send(blog);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
});



fastify.delete("/blogs/:blogId", async (request, reply) => {
  const { blogId } = request.params;

  try {
    const result = await blogCollection.deleteOne({
      _id: new fastify.mongo.ObjectId(blogId),
    });

    if (result.deletedCount === 0) {
      return reply.status(404).send({ message: "Blog not found" });
    }

    return reply.status(200).send({ message: "Blog deleted successfully" });
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
});

fastify.get("/tags", async (request, reply) => {
  try {
    const tags = await tagCollection.find().toArray();
    return reply.status(200).send(tags);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
})

fastify.post("/tags", async (request, reply) => {
  const { tagName } = request.body;
  if (!tagName) {
    return reply.status(400).send({ message: "Tag name is required" });
  }

  try {
    const result = await tagCollection.insertOne({ tagName });
    return reply.status(201).send({ message: "Tag created", result });
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
})

fastify.get("/tags/:tagId", async (request, reply) => {
  const { tagId } = request.params;

  try {
    const tag = await tagCollection.findOne({
      _id: new fastify.mongo.ObjectId(tagId),
    });

    if (!tag) {
      return reply.status(404).send({ message: "Tag not found" });
    }

    return reply.status(200).send(tag);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
})




// category routes

fastify.get("/categories", async (request, reply) => {
  try {
    const tags = await categoriesCollection.find().toArray();
    return reply.status(200).send(tags);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
})


fastify.post("/categories", async (request, reply) => {
  const { categoryName } = request.body;
  try{
    const categories = await categoriesCollection.insertOne({categoryName})
    return reply.status(200).send({ data: categories,message: "Category created", categories})
  }
  catch(err){
    return reply.status(500).send({error: err.message})
  }
})

fastify.get("/categories/:categoryId", async (request, reply) => {
  const { categoryId } = request.params;

  try {
    const category = await categoriesCollection.findOne({
      _id: new fastify.mongo.ObjectId(categoryId),
    });

    if (!category) {
      return reply.status(404).send({ message: "Category not found" });
    }

    return reply.status(200).send(category);
  } catch (err) {
    return reply.status(500).send({ error: err.message });
  }
})




fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at http://localhost:3000`);
});

