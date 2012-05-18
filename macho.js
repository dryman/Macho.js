(function( $ ) {
  $.fn.macho = function (len) {
    len = len || 3;
    var puncs_reg = new RegExp("[-,_\\|<.>/?;:'\"`~!@#$%&*()（）‧´・ωつдС；∀ﾟo彡★☆▽￣╮╭ノ╰〒皿～┴‵□′↗︴yΦθ↖，。？！：；＠m＃＄％︿＆＊＝＋╰╯崩潰艸凸∩＿ˍ▁▂▃▄▅▆▇◣◎█◢^]+$");

    // TODO: need to reset if there is already <span class='macho'> tags in html
    // TODO: handle special characters like &amp
    var genReg = function (acc, len, html){
      if (len === 0) {
        return new RegExp(acc);
      } 
      else {
        /* res[1] = ((\w+)|(&\w{1,5};))
         * res[2] = (\w+)
         * res[3] = (&\w{1,5};)
         */
        var reg = new RegExp("((\\w+)|(&\\w{1,5};))"+acc); 
        var res = reg.exec(html);
        if (res != null) {
          if (res[2] != null && res[2].length > 3) { // Length of (\w+) > 3
            return reg;
          } else {
            // Short word or html escaped caracter are treated as one wide
            // caracter (like one Chinese caracter)
            return genReg(res[0]+"$", --len, html); 
          }
        } else {
            // Add one non ascii charater to accumulator
          return genReg("\\W"+acc,--len, html)
        }
      }
    };
    var output = "<span class='macho' style='display: inline-block;'>$&</span>";
      

    this.each(function(idx){
      var punc = $(this).html().match(puncs_reg); // faild if end with </em> or </strong>
      if (punc!=null && punc[0].length > 3) 
        return $(this).html($(this).html().replace(puncs_reg,output)) || true; // works like continue

      var reg = genReg(punc+"$", len, $(this).html());
      return $(this).html($(this).html().replace(reg,output)) || true;

    });
  };
})( jQuery );
