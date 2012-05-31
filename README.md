Usage: 

``First build the queries either according to term, wildcard, prefix, or range.``
``Then simply call the function build() to get json data.``

For example:

If you want to a query for searching artist name dread and get the first 20 results: 

``var qb = new QueryBuilder();``
``qb.prefix_builder("name", "dread");``
``var json_data = qb.build(0,20);``

Then you can do a simple ajax call request to the elastic server with the json_data to get the results back.




