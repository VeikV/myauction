Handlebars.registerPartial("category", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"category-block\">\r\n	<div class=\"category\">\r\n		<img src=\"../src/images/category1.png\" class=\"category__image\">\r\n		<div class=\"category__text-block\">\r\n			<img class=\"category__text-block-icon\"  src=\"../src/images/icon-men.png\">\r\n			<span class=\"category__text-block-title\">Men</span>\r\n		</div>\r\n	</div>\r\n	<div class=\"category\">\r\n		<img src=\"../src/images/category2.png\" class=\"category__image\">\r\n		<div class=\"category__text-block\">\r\n			<img class=\"category__text-block-icon\"  src=\"../src/images/icon-president.png\">\r\n			<span class=\"category__text-block-title\">Presidents</span>\r\n		</div>\r\n	</div>\r\n	<div class=\"category\">\r\n		<img src=\"../src/images/category3.png\" class=\"category__image\">\r\n		<div class=\"category__text-block\">\r\n			<img class=\"category__text-block-icon\" src=\"../src/images/icon-humanoids.png\">\r\n			<span class=\"category__text-block-title\">Humanoids</span>\r\n		</div>\r\n	</div>\r\n	<div class=\"category\">\r\n		<img src=\"../src/images/category4.png\" class=\"category__image\">\r\n		<div class=\"category__text-block\">\r\n			<img class=\"category__text-block-icon\"  src=\"../src/images/5D-icon.png\">\r\n			<span>5D creautures</span>\r\n		</div>\r\n	</div>\r\n</div>";
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
Handlebars.registerPartial("contacts", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div data-components=\"Contacts\"  class=\"contact\">\r\n  <h2 class=\"contact__title\">We need your feedback</h2>\r\n  <div class=\"contact__form\">\r\n  	<form class=\"form\">\r\n		  <div class=\"form__wrapper\">\r\n		    <div class=\"form__col\">\r\n		      <label class=\"form__label\">Name\r\n		        <input class=\"form__input\"  type=\"text\" placeholder=\"How do they call you?...\">\r\n		      </label>\r\n		   		<label class=\"form__label\">Email\r\n		        <input class=\"form__input\"  type=\"text\" placeholder=\"It will be great if you have some shit like that...\">\r\n		      </label>\r\n		   		<label class=\"form__label\">Subject\r\n		        <input class=\"form__input\" type=\"text\" placeholder=\"Better if you have it...\">\r\n		      </label>\r\n		    </div>\r\n		    <div class=\"form__col\">\r\n			    <label class=\"form__label\"> Message\r\n					  <textarea class=\"form__input form__textarea\"  placeholder=\"I need my money back you fucking fucks. Or my race will declare war to yours...\"></textarea>\r\n					</label>\r\n					<div class=\"input-group-button\">\r\n    				<input type=\"submit\" class=\"button\" value=\"Submit\">\r\n  				</div>\r\n		    </div>\r\n		  </div>\r\n		</form>\r\n	</div>\r\n</div>\r\n<div class=\"contact-map\">\r\n	<div class=\"connect\">\r\n		<h3 class=\"connect__title\">Connect with us</h3>\r\n		<div class=\"connect-block\">\r\n			<div class=\"connect__location\">\r\n				<div class=\"contact__location-name\">Gfashion</div>\r\n				<div class=\"contact__location-adress\">Milky way, Solar System, Earth, <br>England, Fuchester, Baker Street 221B</div>\r\n			</div>\r\n			<div class=\"connect__contacts\">\r\n				<div class=\"connect__contacts-item connect__contacts-item_call\">Really nigga?</div>\r\n				<div class=\"connect__contacts-item connect__contacts-item_holo\">GFholo</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class=\"contact-map__nav\">\r\n		<div><img src=\"../src/images/map-nav.png\"></div>\r\n		<div><img src=\"../src/images/map-line.png\"></div>\r\n	</div>\r\n</div>";
},"useData":true}));
this["App"]["templates"]["product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.product,depth0,{"name":"product","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
this["App"]["templates"]["contacts"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.contacts,depth0,{"name":"contacts","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("product", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"product\">\r\n  <div class=\"product__img\">\r\n    <div class=\"product__img-link\"><img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\" alt=\"There was an item image\"></div>\r\n  </div>\r\n  <div class=\"product__title\">\r\n    <div class=\"product__title-link\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\r\n  </div>\r\n  <div class=\"product__category\">\r\n    <div class=\"product__category-link\">"
    + alias4(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category","hash":{},"data":data}) : helper)))
    + "</div>\r\n  </div>\r\n  <div class=\"product__add-to-cart\">\r\n    <a class=\"product__add-to-cart-link\">+</a>\r\n  </div>\r\n  <div class=\"product__price\">"
    + alias4(((helper = (helper = helpers.currency || (depth0 != null ? depth0.currency : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currency","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.price || (depth0 != null ? depth0.price : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data}) : helper)))
    + "</div>\r\n  </div>\r\n</div>";
},"useData":true}));
this["App"]["templates"]["index"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.slider,depth0,{"name":"slider","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials["special-list-component"],depth0,{"name":"special-list-component","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.category,depth0,{"name":"category","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("product-list-component", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div data-components=\"ProductList\" class=\"product-list\">\r\n\r\n</div>";
},"useData":true}));
this["App"]["templates"]["plp"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["product-list-component"],depth0,{"name":"product-list-component","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n\r\n";
},"usePartial":true,"useData":true});
Handlebars.registerPartial("slider", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"slider-promo\">\r\n	<div class=\"slider-promo__images\">\r\n		<img src=\"../src/images/slider-img1.png\"/>\r\n	</div>\r\n	<a href=\"#1\" class=\"slider-promo__nav slider-promo__nav_prev\"></a>\r\n	<a href=\"#2\" class=\"slider-promo__nav slider-promo__nav_next\"></a>\r\n</div>";
},"useData":true}));
this["App"]["templates"]["special-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = "";

  stack1 = ((helper = (helper = helpers.special || (depth0 != null ? depth0.special : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"special","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.special) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.product,depth0,{"name":"product","data":data,"indent":"    \t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("special-list-component", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div data-components=\"SpecialList\" class=\"special-list\"></div>";
},"useData":true}));