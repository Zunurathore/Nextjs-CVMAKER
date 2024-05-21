// models/Profile.js
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vorname: { type: String, required: true },
  nachname: { type: String, required: true },
  strabe: { type: String, required: true },
  hausnummer: { type: String, required: true },
  PLZ: { type: String, required: true },
  Ort: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  geburtsdatum: { type: String, required: true },
  ausgeübterBeruf: { type: String, required: true },
  arbeitgeber: { type: String, required: true },
  income: { type: String, required: true },

  // Add other fields as needed
},{timestamps: true});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
