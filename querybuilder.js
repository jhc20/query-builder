/**
 * Module dependencies.
 */
var QueryBuilder =  function () {

var queries = [];

this.build = function (from, size) {
    return query_builder(from, size);
}

function query_builder(from, size) {
    var q = {
        "query": {
            //"match_all": {}   /

            "bool": {


            }
                      
        }
    };
    q.from = from;
    q.size = size;
    //q.query.bool.must = range_builder("cost", "from", 1, "to", 3);    

    q.query.bool.must = queries;

    //q.query.bool.must.term = term_builder("name", "dread");   
    //q.query.bool.must.wildcard = wildcard_builder("name", "dread");
    //q.query.bool.must.prefix = term_builder("description", "dre");    
    return q;

}

this.bool_builder = function(size) {
    var b = {
        "bool": {
        }
    };
    return b;
}

this.must_builder = function(size) {
    var m = {
        "must": {
        }
    };
    return m;
}

this.range_builder = function (property, name1, val1, name2, val2) {    

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

this.term_builder = function(property, value) {
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

this.wildcard_builder = function(property, value) {
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

this.prefix_builder = function(property, value) {
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

}

