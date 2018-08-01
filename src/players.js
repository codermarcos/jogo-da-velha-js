class Players {
  constructor(p1, p2) {    
    this[p1] = -1;
    this[p2] = 1;

    this[-1] = p1;
    this[ 1] = p2;
  }     
}
