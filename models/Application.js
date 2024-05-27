// models/Application.js
import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
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
  inputfoto: { type: String, required: true },
  textarea1: { type: String },
  textarea2: { type: String },
  textarea3: { type: String },
  textarea4: { type: String },
  textarea5: { type: String },

  // Add other fields as needed
},{timestamps: true});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
