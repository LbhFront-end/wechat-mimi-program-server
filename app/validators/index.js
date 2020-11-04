const { Rule, Validator } = require('@core/validator');
const { LoginType, ArtType } = require('@lib/enum');
const { User } = require('@model');

class PositiveIntegerValidator extends Validator {
  constructor() {
    super();
    this.id = [
      new Rule('isInt', '需要传入正整数', {
        min: 1
      })
    ]
  }
}

class RegisterValidator extends Validator {
  constructor() {
    super();
    this.email = [
      new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱')
    ];

    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$")
    ];
    this.password2 = this.password1;
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      })
    ];
  }

  validatePassword(val) {
    const { password1, password2 } = val.body;
    if (password1 !== password2) {
      throw new Error('两个密码不一致！')
    }
  }

  async validateEmail(val) {
    const { email } = val.body;
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (user) {
      throw new Error('邮箱已存在')
    }
  }
}

class TokenValidator extends Validator {
  constructor() {
    super();
    this.account = [
      new Rule('isLength', '账号长度不符合规范', {
        min: 4,
        max: 100
      })
    ];
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少六个字符', {
        min: 6,
        max: 128
      })
    ];
  }

  validateLoginType(val) {
    const { type } = val.body;
    if (!type) {
      throw new Error('type是必填参数')
    }
    if (!LoginType.isThisType(type)) {
      throw new Error('type参数不合法')
    }
  }
}

class NotEmptyValidator extends Validator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', '不允许为空', {
        min: 1
      })
    ]
  }
}

function checkArtType(val) {
  let type = val.body.type || val.path.type
  if (!type) {
    throw new Error('type是必填参数')
  }
  type = parseInt(type);
  if (!ArtType.isThisType(type)) {
    throw new Error('type参数不合法')
  }
}

class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super();
    this.validateType = checkArtType;
  }
}

class ClassicValidator extends LikeValidator { }

class SearchValidator extends Validator {
  constructor() {
    super();
    this.q = [
      new Rule('isLength', '搜索关键字不能为空', {
        min: 1,
        max: 16
      })
    ];
    this.start = [
      new Rule('isInt', '不符合规范', {
        min: 0,
        max: 60000
      })
    ];
    this.count = [
      new Rule('isInt', '不符合规范', {
        min: 1,
        max: 20
      }),
      new Rule('isOptional', '', 20)
    ];
  }
}

class AddShortCommentValidator extends PositiveIntegerValidator {
  constructor() {
    super();
    this.content = [
      new Rule('isLength', '必须在1到12个字符之间', {
        min: 1,
        max: 12
      })
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClassicValidator,
  SearchValidator,
  AddShortCommentValidator
}