const { Sequelize, Model } = require('sequelize');
const sequelize = require('../../core/db');

class Comment extends Model {
  static async addComment(book_id, content) {
    const comment = await Comment.findOne({
      where: {
        book_id,
        content
      }
    })
    if (!comment) {
      return await Comment.create({
        book_id,
        content,
        nums: 1
      })
    } else {
      return await comment.increment('nums', {
        by: 1
      })
    }
  }

  static async getComments(book_id) {
    const comments = await Comment.findAll({
      where: {
        book_id
      }
    })
    return comments;
  }

  toJSON() {
    return {
      content: this.getDataValue('content'),
      nums: this.getDataValue('nums'),
    }
  }
}

Comment.init({
  content: Sequelize.STRING(12),
  nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  book_id: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'comment'
})

module.exports = Comment;