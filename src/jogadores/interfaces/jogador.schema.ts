import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema({
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: {type: String},
    ranking: String,
    position: Number,
    urlPlayerPicture: String
},
    {
        timestamps: true, collection: 'jogadores'
    }
);