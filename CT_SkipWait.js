//=============================================================================
// CT_SkipWait.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 CottonDofu
// This software is released under the MIT License, see
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc スキップウェイト
 * @author CottonDofu
 *
 * @help イベントコマンド「ウェイト」において、
 * プラグインコマンド直後のウェイトをキー入力でスキップ可能にします。
 *
 * プラグインコマンド詳細
 *  イベントコマンド「プラグインコマンド」から実行。
 *
 * スキップウェイト : 直後の「ウェイト」命令をキー入力でスキップ可能にします。
 * SkipWait         : If you key in, it's possible to skip a 'wait' command just after this plugin command.
 *
 * 利用規約：
 *  文頭のMITライセンスに準じます。
 *  作者への無断での利用・改変を前面許可しますが
 *  無保証であり、自己責任での使用をお願い致します。
 */
(function () {
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
	  _Game_Interpreter_pluginCommand.call(this, command, args);
	  if (command == "スキップウェイト") {
	        this.skipWait = true;
	  }
	  if (command == "SkipWait") {
	        this.skipWait = true;
	  }
	};

	var _CT1_Game_Interpreter_initialize = Game_Interpreter.prototype.initialize
	Game_Interpreter.prototype.initialize = function() {
		_CT1_Game_Interpreter_initialize.call(this);
		this.skipWait = false;
	};

	var _CT1_Game_Interpreter_clear = Game_Interpreter.prototype.clear
	Game_Interpreter.prototype.clear = function() {
		_CT1_Game_Interpreter_clear.call(this);
		this.skipWait = false;
	};

	var _CT1_Game_Interpreter_updateWaitCount = Game_Interpreter.prototype.updateWaitCount
	Game_Interpreter.prototype.updateWaitCount = function() {
		if((this.skipWait == true) 
		 &&(Input.isTriggered('ok') 
		   || Input.isTriggered('cancel') 
		   || Input.isTriggered('shift') 
		   || Input.isTriggered('up') 
		   || Input.isTriggered('down') 
		   || Input.isTriggered('left') 
		   || Input.isTriggered('right') 
		   || TouchInput.isTriggered() 
		   || TouchInput.isCancelled()
		   )
		){
			this._waitCount = 0;
			this.skipWait = false;
			this.wait(1);
		}
		var result = _CT1_Game_Interpreter_updateWaitCount.call(this);
		return result;
	};
})();
