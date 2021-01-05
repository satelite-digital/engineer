	/**
	 * # createRequestContext
	 * A function that creates a context for a controller to pass to invoked service
	 * @param {object} src - The source object from which you want to get a derived object, i.e. req
	 * @param {object} get - An object describing what you want from the source object.
	 * - You can use ```true``` to select keys
	 * - Use "alias" to select keys using an alias
	 * - You can also set an alias by using ['key-as-alias']
	 * - You can select deep keys
	 *
	 * ## example
	 * ```
	 * { ctx : { db : { form : true } }, _query : "query", session : true, ["body-as-target"] : true }
	 * ```
	 * @param {object} options - An object containing any of the following options as keys:
	 * ### spread (options.spread)
	 * Contains an array with strings containing the name of the keys that should spread into the root of the context.
	 * #### example (and default):
	 * ```
	 * { spread : ['ctx', 'params'] }
	 * ```
	 * 
	 * ## Technical debt
	 * - Must refactor X to Y to support cases like Z
	 */
	
	const createRequestContext = (src, get, options = { spread : ['ctx', 'params'] })=>{
		
	
		
		let context = {}

		for(var index in Object.keys(get)){
				var keys = Object.keys(get)
			var key = keys[index]
			// as
			var mask, originalKey
			var value
			
			if(key.indexOf('-as-') > 0){
				originalKey = key
				mask = key.split('-as-')[1]	
				key = key.split('-as-')[0]
				value = get[originalKey]
			}else{
				value = get[key]
			}
			
			
			if(typeof value == "boolean" && value == true){
				context[mask || key] = src[key]
			}else if(typeof value == "string"){
				context[mask || value] = src[key] 
			}else if(typeof value == "object"){
				context[mask || key] = createRequestContext(src[key], value)
			}
		}
		
		if(options && 'spread' in options){

			for(i in options.spread){
				
				if(options.spread[i] in context){
					var spread = { ...context[options.spread[i]] }
					delete context[options.spread[i]]
					context = { ...spread, ...context }
				}	
			
			}
		}

		return context
}

module.exports = { createRequestContext }