//=============================================================================
// CT_SkipWait.js  ver.1.1
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
 * 【プラグインコマンド】
 *  イベントコマンド「プラグインコマンド」から実行。
 *
 *    スキップウェイト : 直後の「ウェイト」命令をキー入力でスキップ可能にします。
 *    SkipWait         : If you key in, it's possible to skip a 'wait' command just after this plugin command.
 *
 * 【パラメータ】
 *  コマンドに続けて半角スペースで区切って記述。
 *
 *    指定スイッチON（省略可）
 *      スキップの実行時に指定したスイッチをONにします。
 *    　条件分岐を組み合わせることで
 *    　「キーを押したらここの処理まで全スキップ」
 *    　という処理などを実現できます。
 *
 *  【使用例】
 *    スキップウェイト （次のウェイト命令をスキップ可能にする）
 *    スキップウェイト 5 （次のウェイト命令をスキップ可能にし、スキップした場合スイッチ5をONにする）
 *
 *
 * 更新履歴：
 *  2017/04/12 ver.1.1
 *    スキップ時に指定したスイッチをONにする機能を追加。
 *  2017/04/12 ver.1.0
 *    プラグイン公開
 *
 * 利用規約：
 *  文頭のMITライセンスに準じます。
<<<<<<< HEAD
 *  作者への無断での利用・改変を前面許可しますが
 *  無保証であり、自己責任での使用をお願い致します。
=======
 *  作者への無断での利用・改変を許可しますが
 *  無保証であり、自己責任での使用をお願いします。
>>>>>>> refs/remotes/origin/master
 */
(function () {

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
	  _Game_Interpreter_pluginCommand.call(this, command, args);
	  if (command == "スキップウェイト") {
	        this.skipWait = true;
		this.skipSwitch = args[0]||-1;
	  }
	  if (command == "SkipWait") {
	        this.skipWait = true;
		this.skipSwitch = args[0]||-1;
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
	console.log(this.skipSwitch);
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
			if (this.skipSwitch != -1){$gameSwitches.setValue(this.skipSwitch,true);}
			this._waitCount = 0;
			this.skipWait = false;
			this.wait(1);
		}
		var result = _CT1_Game_Interpreter_updateWaitCount.call(this);
		return result;
	};
})();
