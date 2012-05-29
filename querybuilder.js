/**
 * Module dependencies.
 */
var
    es = require('./elasticsearch'),    
    fs = require('fs');

var 
    default_port = "9200";        

var port, file_name;

port = process.argv[2] || default_port;
index_name = process.argv[3];
mapping_name = process.argv[4];


var db = es.connect("localhost", port);
var index = db.index(index_name);
var mapping = index.mapping(mapping_name);
var queries = [];

//var term = [];
//var wildcard = [];
//var prefix = [];
//var range = [];

// time to search
var target = mapping; //index;

//var q = new Query();
//q.range_builder("cost", "from", 1, "to", 3);
range_builder("cost", "from", 1, "to", 4);
range_builder("cost", "from", 1, "to", 5);	
term_builder("name", "angel");

build();

function build() {
    target.count(countCallback);

}

function query_builder(size) {
    var q = {
        "query": {
            //"match_all": {}   /

	        "bool": {


        	}
			          
        }
    };
    q.size = size;
	//q.query.bool.must = range_builder("cost", "from", 1, "to", 3);	

	q.query.bool.must = queries;

	//q.query.bool.must.term = term_builder("name", "dread");	
	//q.query.bool.must.wildcard = wildcard_builder("name", "dread");
	//q.query.bool.must.prefix = term_builder("description", "dre");	

	// make it preety
	var str = JSON.stringify(q, null, '  ')
    console.log("query = " + str);
    return q;

}

function query_appender(array) {
	var query;
	for (i=0; i < array.length; i++ ) {
		
	}
}

function bool_builder(size) {
    var b = {
        "bool": {
        }
    };
    return b;
}

function must_builder(size) {
    var m = {
        "must": {
        }
    };
    return m;
}

function range_builder(property, name1, val1, name2, val2) {	

	var rangeQuery = {};

	var rangeObj = {};
	//var range = {from:start, to: finish};
	var range = {};
	if (name1) {
		range[name1] = val1;
	}	
	if (name2) {
		range[name2] = val2;
	}	

	console.log(range);
	rangeObj[property] = range;   
	rangeQuery["range"] = rangeObj;

	var str = JSON.stringify(rangeQuery);
	console.log("range obj = " + str);

	//console.log("length = " + this.range_Queries.length);

	queries.push(rangeQuery);

    /*
    ex)
    var r = {			
		cost: {
			from: start,
			to: finish
		}			
    };
*/

    return rangeQuery;
}

function term_builder(property, value) {
	var termQuery = {};

	var termObj = {};		
	termObj[property] = value;
   	termQuery["term"] = termObj;
   	/* ex)
	term: {
		name: "seraph"
	}
	*/

	queries.push(termQuery);
    return termQuery;
}

function wildcard_builder(property, value) {
	var wildCardQuery = {};

	var wildCardObj = {};		
	wildCard[property] = value + "*";
	wildCardQuery["wildcard"] = wildCard;
   
   	/* ex)
	wildcard: {
		name: "drea*"
	}
	*/

	queries.push(wildCardQuery);
    return wildCardQuery;
}

function prefix_builder(property, value) {
	var prefixQuery = {};

	var prefixObj = {};		
	prefixObj[property] = value;
	prefixQuery["prefix"] = prefixObj;
   
   	/* ex)
	prefix: {
		name: "seraph"
	}
	*/

	queries.push(prefixQuery);
    return prefixQuery;
}


function countCallback(response, obj) {
    if (obj.count) {
        var count = JSON.stringify(obj.count);
        console.log("count = " + count);
        var q = query_builder(count);        
        target.search(q, searchCallback);
    }


}

function searchCallback(response, obj) {
    if (obj.hits) {
        //TODO: Remove unused information from the JSON        )
        //var data = JSON.stringify(obj.hits.hits);
        //console.log("data = " + data);
        var json_data = obj.hits.hits;
        var count = 0;
        json_data.forEach(function(data) {
        	var data_source = data._source;
        	/*
            console.log("Set = " + data_source.set);
            console.log("Name = " + data_source.name);
            console.log("icon = " + data_source.icon); 
            console.log("type = " + data_source.type);
            console.log("cost = " + data_source.cost);
            console.log("mechanics = " + data_source.mechanics);
            console.log("description = " + data_source.description);
            */
            count++;
        })

        console.log("Result = " + count);
    }
}



