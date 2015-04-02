Orderbooks = new Mongo.Collection("orderbooks");
AllOrderbooks = new Mongo.Collection("allorderbooks");
Whitelist = new Mongo.Collection("whitelist");


////////////////////////////
//
// iron:router
//
///////////////////////////
Router.configure({
      //layoutTemplate: 'masterLayout',
      //notFoundTemplate: 'notFound',
      //loadingTemplate: 'loading',
    });

Router.route('/', function () {
  this.render('homeNew', {
    data: function () {
      return Orderbooks.findOne({'obookid': '17554243582651323474'});
    }
	});
});

Router.route('/orderbook/', function () {
  this.render('homeNew', {
    data: function () {
      return Orderbooks.findOne({'obookid': '17554243582651323474'});
    }
	});
});

Router.onAfterAction('customPackageHook');
Router.onAfterAction('customPackageHook');

Router.route('/orderbook/:_id', function () {
  this.render('homeNew', {
	  
	       waitOn: function() {
          
          return Meteor.subscribe('orderbooks');
	  },
    data: function () {
      return Orderbooks.findOne({'obookid': this.params._id});
    }
  });
});

Iron.Router.hooks.customPackageHook = function () {
  orderbooks = Orderbooks.find({'obookid': this.params._id}).fetch()[0];
  Session.set('baseid', orderbooks.baseid);
  Session.set('relid', orderbooks.relid);
  console.log(orderbooks.baseid);

  this.next();
};

if (Meteor.isClient) {
	
	//Tracker.autorun(function () {
	  //var baseid = Session.get("baseid");
	  //var relid = Session.get("relid");
	      //allorderbooks = AllOrderbooks.find({'baseid': baseid,'relid': relid}).fetch()[0].orderbooks;
  	//Session.set('basename', allorderbooks.base);
	//Session.set('relname', allorderbooks.rel);
	//});
	
	Meteor.subscribe('orderbooks');
	Meteor.subscribe('allorderbooks');
	Meteor.subscribe('whitelist');
	
	Session.setDefault('baseid', '17554243582654188572');
	Session.setDefault('relid', '5527630');
	Session.setDefault('obookid', '17554243582651323474');
	
	Session.setDefault('basename', 'BTC');
	Session.setDefault('relname', 'NXT');
	
	function testSet(baseid,relid){
		
	allorderbooks = AllOrderbooks.find({'baseid': baseid,'relid': relid}).fetch()[0].orderbooks;
  	Session.set('basename', allorderbooks.base);
	Session.set('relname', allorderbooks.rel);
	
	}
	
	//test
	
	//123
	
	//Meteor.call("placeBid","0.1","100","11060861818140490423","17554243582654188572");
	
	var x=0.01;
	var y=1;
	//Meteor.call("placeBid",x,y,"11060861818140490423","17554243582654188572");
	
	function testDEX(){
			var x=0.0000000001;
			var y=1;
		for(i=0;i<100;i++){
			

			Meteor.call("placeBid",x,y,"11060861818140490423","17554243582654188572");
			
			
			x+=0.0000000001;
		}	
	}
	
		//testDEX();
			
	//Meteor.call("getOrderbook","11060861818140490423","17554243582654188572");
	
	//Meteor.call("getOrderbook","11060861818140490423","17554243582654188572");
	

	
	//"base": "NXT", "baseid": "5527630", "rel": "BTC", "relid": "17554243582654188572"
    
    //Meteor.call("allOrderbooks");
    
    //Meteor.call("getPeers");
	
  //var result = HTTP.get("http://127.0.0.1:7778/%7B%22requestType%22:%22orderbook%22,%22baseid%22:%2211060861818140490423%22,%22relid%22:%2217554243582654188572%22%7D").content;
  function test(){
	  
	  $('#output').append("tessst");
	  }

	//test();
	
	    //document.getElementById("id").innerHTML = "value";  
	
  // counter starts at 0
  Session.setDefault('counter', 0);


   //Template.orderbooksHome.helpers({
    //orderbooks: function () {
 
	//return Orderbooks.find({'orders.baseid':Session.get('baseid'),'orders.relid':Session.get('relid')}).fetch()[0];

    //}
  //});
  
   Template.orderbooksoverview.helpers({
    data: function () {
 
	return AllOrderbooks.find().fetch()[0].orderbooks;

    }
  });
  
  Template.overview.helpers({
    obookid: function () {
 
	orderbooks = Orderbooks.find({'baseid':this.baseid,'relid':this.relid}).fetch()[0];
    return orderbooks.obookid;
    }
  });
  
    //Template.testinfo.helpers({
    //obookid: function () {
 
		
      //return JSON.stringify(Orderbooks.find({'orders.baseid':'17554243582654188572','orders.relid':'5527630'}).fetch()[0]);
    //}
  //});
  
  function getOrderbookFromArray(baseid,relid){
	  
		array = AllOrderbooks.find().fetch()[0].orderbooks;
		returnObject = {};
		

		for (var i=0;i<array.length;i++){
			
			//console.log(JSON.stringify(array[i]));
			if(array[i].baseid==baseid && array[i].relid==relid){
				returnObject=array[i];
				
				
			}
		}
		
		return returnObject;
	}
	
	//Template.orderbooksHome.helpers({
	//orderbooks: function(){
		
		//return AllOrderbooks.find().fetch()[0].orderbooks.orderbooks;
	//},
//});

	//Template.orderbook.helpers({
	//bla: function(){
		
		//return JSON.stringify(Orderbooks.find({'obookid':'17554243582651323474'}).fetch());
	//}
	//});
	
	Template.orderbook.helpers({

    basename: function () {
 
		return getOrderbookFromArray(this.baseid,this.relid).base;
    },
    relname: function () {
 
      return getOrderbookFromArray(this.baseid,this.relid).rel;
    }
  });
	
  
  Template.info.helpers({

    baseid: function () {
 
		return Session.get('baseid');
    },
    relid: function () {
 
      return Session.get('relid');
    },
        basename: function () {
 
		return Session.get('basename');
    },
    relname: function () {
 
      return Session.get('relname');
    }
  });
  

	
	Template.bidtable.rendered = function () {
		$("#bidtable").dataTable();

	}
	
	Template.asktable.rendered = function () {

		$("#asktable").dataTable();
	}
	
	Template.createOrderbook.events({
    'click button': function () {

		var baseid = document.getElementById("baseid").value;
		var relid = document.getElementById("relid").value;
      Meteor.call("getOrderbook",baseid,relid,function(err,result){
        //$('#output').append(result);
        //alert(result);
        
		});
		}
	});
	

	
  
   Template.placeBid.events({
    'click button': function () {
		//alert(document.getElementById("price").value)
		var baseid = "11060861818140490423";
		var relid = "17554243582654188572";
		var price = document.getElementById("bidPrice").value;
		var amount = document.getElementById("bidAmount").value;
      Meteor.call("placeBid",price,amount,baseid,relid,function(err,result){
        //$('#output').append(result);
        //alert(result);
        
		});
		}
	});
	
	Template.placeAsk.events({
    'click button': function () {
		//alert(document.getElementById("price").value)
		var baseid = "11060861818140490423";
		var relid = "17554243582654188572";
		var price = document.getElementById("askPrice").value;
		var amount = document.getElementById("askAmount").value;
      Meteor.call("placeAsk",price,amount,baseid,relid,function(err,result){
        //$('#output').append(result);
        //alert(result);
        
		});
		}
	});
}

if (Meteor.isServer) {
	
	Meteor.publish('orderbooks', function() {
	  return Orderbooks.find();
	});
	Meteor.publish('allorderbooks', function() {
	  return AllOrderbooks.find();
	});
	Meteor.publish('whitelist', function() {
	  return Whitelist.find();
	});
	
	var port = "7777";
	var server= "http://localhost";
	
	Meteor.methods({
		updateSettings: function(baseid,relid){
			
			
			Session.set('baseid',baseid);
			Session.set('relid',relid);
			Meteor.call("getOrderbook",baseid,relid);
			Meteor.call("allOrderbooks");
			
			},
		placeBid: function(price, volume, baseid, relid){
			
			var result = HTTP.get(server+":"+port+"/%7B%22requestType%22:%22placebid%22,%22baseid%22:%22"+baseid+"%22,%22relid%22:%22"+relid+"%22,%22volume%22:%22"+volume+"%22,%22price%22:%22"+price+"%22%7D").content;
			var json = JSON.parse( result);
			
			//console.log(result);
			
			Meteor.call("getOrderbook",baseid,relid);
		
		},
		placeAsk: function(price, volume, baseid, relid){
			
			var result = HTTP.get(server+":"+port+"/%7B%22requestType%22:%22placeask%22,%22baseid%22:%22"+baseid+"%22,%22relid%22:%22"+relid+"%22,%22volume%22:%22"+volume+"%22,%22price%22:%22"+price+"%22%7D").content;
			var json = JSON.parse( result);
			
			//console.log(result);
			
			Meteor.call("getOrderbook",baseid,relid);
		
		},
		allOrderbooks: function(){
			
			var result = HTTP.get(server+":"+port+"/%7B%22requestType%22:%22allorderbooks%22%7D").content;
			var json = JSON.parse( result);
			
			orderbooks = AllOrderbooks.find().fetch();
			//console.log(json);
			
			if(orderbooks.length==0){
				AllOrderbooks.insert(json);
			}else{
				AllOrderbooks.remove({});
				AllOrderbooks.insert(json);
			}
			
			
			
				//for(i=0;i<json.orderbooks.length;i++){
				
					//if(json.orderbooks[i].numquotes>0){
					//Meteor.call("getOrderbook",json.orderbooks[i].baseid,json.orderbooks[i].relid);
					//}
				//}
			
			},
		getOrderbook: function(baseid, relid) {

			   result = HTTP.get(server+":"+port+"/%7B%22requestType%22:%22orderbook%22,%22baseid%22:%22"+baseid+"%22,%22relid%22:%22"+relid+"%22%7D").content;
			   
			   var json = JSON.parse( result);
			   console.log(json.obookid);
			   orderbooks = Orderbooks.find({'obookid':json.obookid}).fetch();
		
				if(!json.error){
				if(orderbooks.length === 0){
					
					Orderbooks.insert({'obookid':json.obookid,'baseid':json.baseid,'relid':json.relid,'orders':json });
				}else{
					
					Orderbooks.update({'obookid':json.obookid,'baseid':json.baseid,'relid':json.relid},{'baseid':json.baseid,'relid':json.relid,'obookid':json.obookid,'orders':json });
				}
				}
			   
			   
			   return result;    
			},
		getPeers: function(){
			
			test = HTTP.get(server+":"+port+"/%7B%22requestType%22:%22getpeers%22%7D").content;
			console.log(test);
			
			return test;
			
			}
	});
	
	
  Meteor.startup(function () {
	
    Meteor.call("getOrderbook","17554243582654188572","5527630");
	Meteor.call("getOrderbook","6220108297598959542","5527630");
	Meteor.call("allOrderbooks");
  });
}
