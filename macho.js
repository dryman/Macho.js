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

    // TODO: need to reset if there is already <span class='macho'> tags in html
    // TODO: If there are some regexp strings in acc, there will be a problem
    // TODO: Should use XRegExp module and there is regexp escape function that
    // can solve the problem
    var reg_escape = function (str) {
      return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
    var genReg = function (acc, len, html){
      if (len === 0) {
        return new XRegExp(acc);
      } 
      else {
        /* res[1] = ((\w+)|(&\w{1,5};))
         * res[2] = (\w+)
         * res[3] = (&\w{1,5};)  // will fail if there is '#' in \w
         */
        var reg = new XRegExp("((\\w+)|(&\\w{1,5};))"+acc); 
        var res = reg.exec(html);
        if (res != null) {
          if (res[2] != null && res[2].length > 3) { // Length of (\w+) > 3
            return reg;
          } else {
            // Short word or html escaped character are treated as one wide
            // character (like one Chinese character)
            return genReg(res[0]+"$", --len, html); 
          }
        } else {
            // Add one non ascii charater to accumulator
          return genReg("\\W"+acc,--len, html)
        }
      }
    };
      

    var puncs_reg = new XRegExp("[-,_\\|<.>/?;:'\"`~!@#$%&*()（）‧´・ωつдС；∀ﾟo彡★☆▽￣╮╭ノ╰〒皿～┴‵□′↗︴yΦθ↖，。？！：；＠m＃＄％︿＆＊＝＋╰╯崩潰艸凸∩＿ˍ▁▂▃▄▅▆▇◣◎█◢^]+$");
    this.each(function(idx){
      if ($(this).html().match(/</)) return true; // do nothing if other tags are found.

      var punc = $(this).html().match(puncs_reg); 
      if (punc!=null && punc[0].length > 3) 
        return $(this).html($(this).html().replace(puncs_reg,output)) || true; // works like continue

      console.log(idx,punc);

      var reg = genReg(reg_escape(punc[0])+"$", len, $(this).html());
      return $(this).html($(this).html().replace(reg,output)) || true;

    });
  };
})( jQuery );
