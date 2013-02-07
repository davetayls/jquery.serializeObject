/*! Serialize Form to Object - v0.1.0 - 2013-02-07
* https://github.com/davetayls/jquery.serializeObject
* Copyright (c) 2013 davetayls; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        $.serializeObject.namespaceString(this.name, o, this.value);
    });
    return o;
  };

  $.serializeObject = {};
  function getSpaceName(space){
      RegExp.lastIndex = 0;
      var matches = /([^\[\]]*)(?:\[\d\])?/gi.exec(space);
      return matches ? matches[1] : space;
  }
  function getSpaceIndex(space){
      RegExp.lastIndex = 0;
      var matches = /.*\[(\d)\]/gi.exec(space);
      return matches ? matches[1] : null;
  }

  /**
   * turns something like name.space.space into
   * { name: { space: { space: {} } } }
   * @param  {string} name  dot notation string namespace
   * @return {object} returns a new object or the value at the location
   */
  $.serializeObject.namespaceString = function(name, o, value) {
    o = o || {};
    var spaces = name.split('.'),
      ln = spaces.length-1,
      level = o;

    // make sure value is set
    value = value || {};

    $.each(spaces, function(i, space) {
      var spaceName = getSpaceName(space),
        index = getSpaceIndex(space)
      ;
      if (index){
        level[spaceName] = level[spaceName] || [];
        if (ln === i){
          level[spaceName][index] = level[spaceName][index] || value;
        } else {
          level[spaceName][index] = level[spaceName][index] || {};
        }
        level = level[spaceName][index];
      } else {
        if (ln === i){
          level[spaceName] = level[spaceName] || value;
        } else {
          level[spaceName] = level[spaceName] || {};
        }
        level = level[spaceName];
      }
    });
    return { obj: o };
  };


  // Static method default options.
  $.serializeObject.options = {
  };


}(jQuery));
