
class CONF {
  constructor() {
  	this.conf = { 
  	   sessions: []
    }
  }
  set(key, value) {
  	this.conf[key] = value;
  	return true;
  }
  set_sessions(value) {
  	this.conf.sessions.push(value);
  	return true;
  }
  get(key) {
  	return this.conf[key] ?? null;
  }
  static conf() {
  	if (!CONF.instance) {
  		CONF.instance = new CONF();
  	}
  	return CONF.instance;
  }
}

/**
 * A tiny cache for storing the programs static variables.
 * This cache provides a `get` and `set` method, for handling read and writes. 
 */
const conf = () => CONF.conf();

export default conf;
