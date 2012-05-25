/* Macho.js - Better CJK text wrapping V0.3 (Beta)
 * https://github.com/dryman/Macho.js
 * Author Felix Ren-Chyan Chern (idryman)
 * BSD License 
 */

(function( $ ) {
  $.fn.macho = function (options) {
    var settings = $.extend({
      'length': 3,
      'inline': true
    }, options);
    len = settings.length;
    var output = settings.inline ? 
      "<span class='macho' style='display: inline-block;'>$&</span>" :
      "<span class='macho'>$&</span>";

    var reg_escape = function (str) {
      return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
    var genReg = function (acc, len, html){
      if (len === 0) {
        return new RegExp(acc);
      } 
      else {
        /* res[1] = ((\w+)|(&\w{1,5};))
         * res[2] = (\w+)
         * res[3] = (&\w{1,5};)  // will fail if there is '#' in \w
         */
        var reg = new RegExp("((\\w+)|(&\\w{1,5};))"+acc); 
        var res = reg.exec(html);
        if (res != null) {
          if (res[2] != null && res[2].length > 3) { // Length of (\w+) > 3
            return reg;
          } else {
            // Short word or html escaped character are treated as one wide
            // character (like one Chinese character)
            return genReg(reg_escape(res[0])+"$", --len, html); 
          }
        } else {
            // Add one non ascii charater to accumulator
          return genReg("\\W"+acc,--len, html)
        }
      }
    };
      

    var puncs_reg = new RegExp("(&\\w{1,5};|[-,_\\|<.>/?;:'\"`~!@#$%&*()（）‧´・ωつдС；∀ﾟo彡★☆▽￣╮╭ノ╰〒皿～┴‵□′↗︴yΦθ↖，。？！：；＠m＃＄％︿＆＊＝＋╰╯崩潰艸凸∩＿ˍ▁▂▃▄▅▆▇◣◎█◢^]+)$");
    this.each(function(idx){
      if ($(this).html().match(/</)) return true; // do nothing if other tags are found.

      var punc = $(this).html().match(puncs_reg); 
      if (punc!=null && punc[0].length > 3) 
        return $(this).html($(this).html().replace(puncs_reg,output)) || true; // works like continue

      var acc = punc != null ?  reg_escape(punc[0]) + "$" : "$";
      var reg = genReg(acc, len, $(this).html());
      return $(this).html($(this).html().replace(reg,output)) || true;

    });
  };
})( jQuery );
