/**
 * カスタム言語、カスタムブロックのサンプルローダーです。
 * カスタム言語、カスタムブロックの作成については次を参照ください:
 * https://vue-loader-v14.vuejs.org/ja/configurations/custom-blocks.html
 */
module.exports = function(source, map) {
  this.callback(null, source, map);
  console.log('\nPolymer custom properties process is completed');
};
