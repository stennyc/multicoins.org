'use strict';

const utils = require('../utils.js');
const alerts = require('../alerts');
const $ = require('jquery');

const urlAPI = "https://tbtc.blockr.io/api/v1/address/";
const urlAPIpush = "https://tbtc.blockr.io/api/v1/tx/push";

exports.netID = 0x6f;
exports.name = "testnet";
exports.Shortname = "TBTC";

exports.getBalance = function(arrayAddr, callback)
{
    console.log('get balance ' + urlAPI + "balance/" + arrayAddr.toString() + "?confirmations=0");
    
    $.getJSON( urlAPI + "balance/" + arrayAddr.toString() + "?confirmations=0", function(data) {
        callback(data);
    })
      .fail(function() {
          callback(utils.JSONreturn(false, 'error'));
      });      
};

exports.pushTransaction = function(hexTX)
{
    console.log('pushTransaction' + hexTX);
   // alert(hexTX)
    $.post( urlAPIpush, { "hex": hexTX })
      .done(function( data ) {
        //alert( "Data Loaded: " + JSON.stringify(data) );
        alerts.OnTransactionSent(data);
      })
      .fail(function(e) {
        //alert( "error " + JSON.stringify(e));
        alerts.OnTransactionSent(e);
      });   
};

exports.getTransactions = function(arrayAddr, callback)
{
    $.getJSON( urlAPI  + "txs/" + arrayAddr.toString(), function(data) {
        callback(exports.netID, data.data);
        
        $.getJSON( urlAPI + "unconfirmed/" + arrayAddr.toString(), function(data2) {
            callback(exports.netID, data2.data);
        }).fail(function() {
            callback(exports.netID, utils.JSONreturn(false, 'error'));
        });      
    }).fail(function() {
        callback(exports.netID, utils.JSONreturn(false, 'error'));
    });   
    
}

exports.getUnspentTransactions = function(arrayAddr, callback)
{
    console.log('getUnspentTransactions: ' + urlAPI + "unspent/" + arrayAddr.toString());
    $.getJSON( urlAPI + "unspent/" + arrayAddr.toString(), function(data) {
        callback(exports.netID, data);
    })
      .fail(function() {
          callback(exports.netID, utils.JSONreturn(false, 'error'));
      });      
}