import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HostModel, { IHost } from "../models/host.model";
import PropertyModel, { IProperty } from "../models/property.model";

const propRoutes = express.Router();

propRoutes.get("/properties", async (req, res) => {
  try {
    const properties = await PropertyModel.find({}, "name city type years");
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve properties." });
  }
});

propRoutes.get("/properties/:propertyId", async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await PropertyModel.findById(propertyId).populate(
      "host",
      "name email"
    );
    if (!property) {
      return res.status(404).json({ error: "Property not found." });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve property information." });
  }
});

// Route to search for properties based on various criteria
propRoutes.post('/properties/search', async (req, res) => {
    try {
      // Assuming the request body contains search criteria like location, property type, etc.
      const { location, propertyType, amenities } = req.body;
  
      // Build the query based on the provided search criteria
      const query: any = {};
      if (location) {
        query.city = location;
      }
      if (propertyType) {
        query.type = propertyType;
      }
      if (amenities) {
        query.amenities = { $in: amenities };
      }
  
      const properties = await PropertyModel.find(query).populate('host', 'name email location');
      res.json(properties);
    } catch (err) {
      res.status(500).json({ error: 'Failed to search for properties.' });
    }
  });

  // Route to filter properties based on location, property type, amenities, etc.
propRoutes.post('/properties/filter', async (req, res) => {
    try {
      // Assuming the request body contains filter options like location, property type, amenities, etc.
      const { location, propertyType, amenities } = req.body;
  
      // Build the filter based on the provided options
      const filter: any = {};
      if (location) {
        filter.city = location;
      }
      if (propertyType) {
        filter.type = propertyType;
      }
      if (amenities) {
        filter.amenities = { $in: amenities };
      }
  
      const properties = await PropertyModel.find(filter).populate('host', 'name email location');
      res.json(properties);
    } catch (err) {
      res.status(500).json({ error: 'Failed to filter properties.' });
    }
  });

export default propRoutes