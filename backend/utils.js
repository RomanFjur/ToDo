class IdGenerator {
  static getNewId(length = 10) {
    // let newId = '';
    // const avaliableSymbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    // for (var i = 0; i < length; i++) {
    //   let randomSymbolIndex = Math.floor(Math.random() * avaliableSymbols.length);
    //   newId = `${newId}${avaliableSymbols[randomSymbolIndex]}`;
    // }
    // return newId;

    const avaliableSymbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    function* generateIndexNumber(start, end) {
      for (let i = start; i < end; i++) {
        yield Math.floor(Math.random() * avaliableSymbols.length);
      }
    }

    function* generateId() {
      yield* generateIndexNumber(0, 10);
    }

    let id = '';

    for (let index of generateId()) {
      id += avaliableSymbols[index];
    }

    return id;
  }
}

module.exports = IdGenerator;
