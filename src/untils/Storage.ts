/**本地存储 */
export default {
	get: function(name: string) {
		let o = localStorage.getItem(name) || ""
		let cut = o.indexOf(';expiretime=')
		let val = o.substring(0, cut < 0 ? o.length : cut)
		if (cut < 0) {
			return this.back(val)
		} else {
			let exp: number = parseFloat(o.substring(cut + 12))
			if (exp < this.time()) {
				this.clear(name)
				return ''
			} else {
				return this.back(val)
			}
		}
	},
	back: function(val: any) {
		if ((val === "") || (val.indexOf("{") < 0) && (val.indexOf("[") < 0)) {
			return val
		} else {
			return JSON.parse(val)
		}
	},
	set: function(name: string, val: any, sec: number|void) {
		val = typeof(val) === "object" ? JSON.stringify(val) : val
		if (sec) {
			val += ';expiretime=' + (this.time() + sec * 1000)
		}
		localStorage.setItem(name, val)
	},
	clear: function(name: string) {
		localStorage.removeItem(name)
	},
	time: function(): number {
		return new Date().getTime()
	}
};
