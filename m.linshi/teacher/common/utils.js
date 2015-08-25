define(function(require, exports, module) {
    return {
        getCurrentMember: function() {
            var member = localStorage.getItem('currentMember');
            if (member) {
                member = JSON.parse(member);
                return member;
            }
        },
        setCurrentMember: function(key, value) {
            if (!value) return false;
            var _v = value;
            if (typeof _v !== 'string') {
                _v = JSON.stringify(_v);
            }
            localStorage.setItem(key ? key : 'currentMember', _v);
            return true;
        }
    };
});
