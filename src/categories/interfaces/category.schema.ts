import mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema({
    category: { type: String, unique: true },
    description: { typr: String },
    events: [
        {
            name: { type: String },
            operation: String,
            value: Number
        }
    ],
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jogador"
        }
    ]
},
    {
        timestamps: true,
        collection: 'categories'
    }
);