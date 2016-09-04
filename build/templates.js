Handlebars.registerPartial("product", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"product\">\r\n  <div class=\"product__img\">\r\n    <div class=\"product__img-link\"><img src=\"\" alt=\"There was an item image\"></div>\r\n  </div>\r\n\r\n  <div class=\"product__label\">Label</div>\r\n\r\n  <div class=\"product__title\">\r\n    <div class=\"product__title-link\">Title</div>\r\n  </div>\r\n\r\n  <div class=\"product__category\">\r\n    <div class=\"product__category-link\">Shoes</div>\r\n  </div>\r\n\r\n  <div classs=\"product__add-to-cart\">\r\n    <a class product__add-to-cart-link>Add to cart</a>\r\n  </div>\r\n\r\n\r\n\r\n <div class=\"product__price\">2$</div>\r\n  </div>\r\n</div>";
},"useData":true}));
this["App"] = this["App"] || {};
this["App"]["templates"] = this["App"]["templates"] || {};
this["App"]["templates"]["error"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"error\">\r\n	<div class=\"error__status\">"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "</div>\r\n	<div class=\"error__status-text\">"
    + alias4(((helper = (helper = helpers.statusText || (depth0 != null ? depth0.statusText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statusText","hash":{},"data":data}) : helper)))
    + "</div>\r\n</div>";
},"useData":true});
this["App"]["templates"]["product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.product,depth0,{"name":"product","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});