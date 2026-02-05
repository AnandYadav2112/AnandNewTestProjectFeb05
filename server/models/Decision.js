// In-memory storage for decisions (you can replace with a database later)
let decisions = [];

class Decision {
  constructor(id, situation, options, selectedOption, dominoPath, butterflyPath, agent, createdAt) {
    this.id = id;
    this.situation = situation;
    this.options = options || [];
    this.selectedOption = selectedOption || null;
    this.dominoPath = dominoPath || [];
    this.butterflyPath = butterflyPath || [];
    this.agent = agent || 'default';
    this.createdAt = createdAt || new Date();
    this.updatedAt = new Date();
  }

  static create(data) {
    const decision = new Decision(
      data.id,
      data.situation,
      data.options,
      data.selectedOption,
      data.dominoPath,
      data.butterflyPath,
      data.agent
    );
    decisions.push(decision);
    return decision;
  }

  static findAll() {
    return decisions;
  }

  static findById(id) {
    return decisions.find(d => d.id === id);
  }

  static update(id, data) {
    const index = decisions.findIndex(d => d.id === id);
    if (index !== -1) {
      decisions[index] = {
        ...decisions[index],
        ...data,
        updatedAt: new Date()
      };
      return decisions[index];
    }
    return null;
  }

  static delete(id) {
    const index = decisions.findIndex(d => d.id === id);
    if (index !== -1) {
      decisions.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = Decision;
