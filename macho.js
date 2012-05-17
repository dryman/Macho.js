(function( $ ) {
  $.fn.macho = function (len) {
    len = len || 3;
    var puncs_reg = new RegExp("[-,_\\|<.>/?;:'\"`~!@#$%&*()（）‧´・ωつдС；∀ﾟo彡★☆▽￣╮╭ノ╰〒皿～┴‵□′↗︴yΦθ↖，。？！：；＠m＃＄％︿＆＊＝＋╰╯崩潰艸凸∩＿ˍ▁▂▃▄▅▆▇◣◎█◢^]+$");

    var genReg = function (acc, len, html){
      if (len === 0) {
        return new RegExp(acc);
      } 
      else {
        var reg = new RegExp("(\\w+)"+acc);
        var res = reg.exec(html);
        if (res != null) {
          if (res[1].length > 3) { // Length of (\w+) > 3
            return reg;
          } else {
            // Treat (\w+) as 1 wide unicode charater, use it as accumulator
            return genReg(res[0]+"$", --len, html); 
          }
        } else {
            // Add one non ascii charater to accumulator
          return genReg("\\W"+acc,--len, html)
        }
      }
    };
    var output = "<span class='macho' style='display: inline-block;'>$&</span>";
      

    // TODO: need to reset if there is already <span class='macho'> tags in html
    this.each(function(idx){
      var punc = $(this).html().match(puncs_reg); // faild if end with </em> or </strong>
      if (punc!=null && punc[0].length > 3) 
        return $(this).html($(this).html().replace(puncs_reg,output)) || true; // works like continue

      var reg = genReg(punc+"$", len, $(this).html());
      return $(this).html($(this).html().replace(reg,output)) || true;

    });
  };
})( jQuery );
