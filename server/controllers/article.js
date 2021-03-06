/**
 * @file 文章控制
 * @author littlewin(littlewin.wang@gmail.com)
 */

const ArticleModel = require('../models/article')

class Article {
  static async list (ctx) {
    let { page, perPage, state, pub, keyword, category, tag, date, hot } = ctx.query

    // filter options
    const options = {
      page: Number(page || 1),
      limit: Number(perPage || 10)
      // populate: ['category', 'tag'],
      // select: '-password -content'
    }

    // 查询参数
    let querys = {}

    // 按照state查询
    if (['0', '1', '-1'].includes(state)) {
      querys.state = state
    }

    // 按照公开程度查询
    if (['0', '1', '-1'].includes(pub)) {
      querys.pub = pub;
    }

    // 关键词查询
    if (keyword) {
      const keywordReg = new RegExp(keyword);
      querys['$or'] = [
        { 'title': keywordReg },
        { 'content': keywordReg },
        { 'description': keywordReg }
      ]
    }

    // 标签id查询
    if (tag) {
      querys.tag = tag
    }

    // 分类id查询
    if (category) {
      querys.category = category
    }

    // 热评查询
    if (!!hot) {
      options.sort = {
        'meta.comments': -1,
        'meta.likes': -1
      }
    }

    // 时间查询
    if (date) {
      const getDate = new Date(date);
      if (!Object.is(getDate.toString(), 'Invalid Date')) {
        querys.create_at = {
          '$gte': new Date((getDate / 1000 - 60 * 60 * 8) * 1000),
          '$lt': new Date((getDate / 1000 + 60 * 60 * 16) * 1000)
        }
      }
    }

    const articles = await ArticleModel.find({})

    // data: {
    //   articles: articles.docs,
    //   total: articles.total,
    //   limit: articles.limit,
    //   page: articles.page,
    //   pages: articles.pages
    // }
    ctx.status = 200
    ctx.body = {
      success: true,
      message: '获取文章列表成功',
      data: articles
    }
  }

  static async patch (ctx) {
    const { articles, action } = ctx.request.body

    if (!articles || !articles.length) {
      ctx.throw(401, '缺少有效参数')
    }

    let updatePart = {}

    switch (action) {
      // 移至回收站
      case 1:
        updatePart.state = -1
        break
      // 移至草稿
      case 2:
        updatePart.state = 0
        break
      // 移至发布
      case 3:
        updatePart.state = 1
        break
      default:
        break
    }

    ctx.status = 200
    ctx.body = {
      success: true,
      message: '更新文章状态成功'
    }
  }

  static async deleteList (ctx) {
    const { articles } = ctx.request.body

    console.log(articles)

    if (!articles || !articles.length) {
      ctx.throw(401, '缺少有效参数')
      return
    }

    await ArticleModel.remove({ '_id': { $in: articles } })

    ctx.status = 200
    ctx.body = {
      success: true,
      message: '文章批量删除成功',
    }
    // generate sitemap
    // createSiteMap()
  }

  static async create (ctx) {
    const article = ctx.request.body

    if (ctx.token.role !== 'admin') {
      ctx.throw(401, '非admin用户不能创建')
      return
    }

    if (!article.title || !article.content) {
      ctx.throw(401, '文章标题或内容为空')
      return
    }

    await new ArticleModel(article).save()
      .then((result) => {
        ctx.status = 200
        ctx.body = {
          success: true,
          message: '创建文章成功'
        }
      })
      .catch(() => {
        ctx.throw(401, '创建文章失败')
      })
  }

  static async get (ctx) {
    const id = ctx.params.id

    // 判断来源
    const isFindById = Object.is(Number(id), NaN)
    let result

    if (isFindById) {
      result = await ArticleModel.findById(id)
    } else {
      result = await ArticleModel.findOne({ id: id, state: 1, pub: 1 }).populate('category tag').exec()
    }

    // 是否查找到
    if (!result) {
      ctx.throw(401, '无法找到对应ID的文章')
      return
    }

    // 每请求一次，浏览次数都要增加
    if (!isFindById) {
      result.meta.views += 1;
      result.save();
    }

    let newResult = result.toObject()
    // 按照tag请求相似文章
    if (!isFindById && result.tag.length) {
      let related = await ArticleModel.find({ state: 1, pub: 1, tag: { $in: result.tag.map(t => t._id) } })
      newResult.related = related
    }

    // 成功回应
    ctx.status = 200
    ctx.body = {
      success: true,
      message: '获取文章成功',
      data: newResult
    }
  }

  static async modify (ctx) {
    const id = ctx.params.id
    const article = ctx.request.body

    // 验证
    if (!article.title || !article.content) {
      ctx.throw(401, '文章标题或内容为空')
      return
    }

    // 重置信息
    delete article.meta
    delete article.createAt
    delete article.updateAt

    let result = await ArticleModel.findByIdAndUpdate(id, article, { new: true })

    ctx.status = 200
    ctx.body = {
      success: true,
      message: '文章修改成功',
      data: result
    }
    // generate sitemap
    // createSiteMap()
  }

  static async delete (ctx) {
    const id = ctx.params.id

    let isExist = await ArticleModel
      .findOne({ _id: id })

    if (!isExist) {
      ctx.status = 401
      ctx.body = {
        success: false,
        message: '文章ID不存在'
      }
      return
    }

    await ArticleModel.findByIdAndRemove(id)

    ctx.status = 200
    ctx.body = {
      success: true,
      message: '文章删除成功',
    }
    // generate sitemap
    // createSiteMap()
  }
}

module.exports = Article
