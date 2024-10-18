const History = require('../models/history');

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find().populate('product user');
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getHistoryById = async (req, res) => {
  try {
    const history = await History.findById(req.params.id).populate('product user');
    if (!history) {
      return res.status(404).json({ message: 'Historial no encontrado' });
    }
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.createHistory = async (product, action, user) => {
  try {
    const newHistory = new History({ product, action, user });
    await newHistory.save();
  } catch (error) {
    console.error('Error al crear historial:', error.message);
  }
}

exports.updateHistory = async (req, res) => {
  try {
    const updatedHistory = await History.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('product user');
    if (!updatedHistory) {
      return res.status(404).json({ message: 'Historial no encontrado' });
    }
    res.status(200).json(updatedHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHistory = async (req, res) => {
  try {
    const deletedHistory = await History.findByIdAndDelete(req.params.id);
    if (!deletedHistory) {
      return res.status(404).json({ message: 'Historial no encontrado' });
    }
    res.status(200).json({ message: 'Historial eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}