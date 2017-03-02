exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://user1:codingisfun@ds113660.mlab.com:13660/solitary-bird';
exports.PORT = process.env.PORT || 8080;