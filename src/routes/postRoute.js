import PostsModel from '../models/posts';
import PostModel from '../models/posts'

const postRoute = (app) => {
    
    app.route('/posts/:id?')
        .get(async (req, res) => {
            const { id } = req.params
            const query = {};

            if (id) {
                query._id = id
            }

            try {
                const posts = await PostModel.find(query)
                res.send({ posts })
                
            } catch (error) {
                res.status(400).send({ error: 'Failed to find posts' })
            }
        })
        .post(async (req, res) => {
            try {
                const post = new PostsModel(req.body);
                await post.save();

                res.status(201).send('OK - Inserido')
            } catch (error) {
                res.send(error)
            }
        })
        .put(async (req, res) => {
            const { id } = req.params

            if (!id) {
                return res.status(400).send({ error: 'Post ID is missing.' })
            }

            try {
                const updatedPost = await PostsModel.findOneAndUpdate({ _id: id }, req.body, {
                    new: true,
                });

                console.log(updatedPost)

                if (updatedPost) {
                    return res.status(200).send('OK - Post Atualizado')
                }

                res.status(400).send({ error: 'Could not update the post' })                
            } catch (error) {
                res.send(error)
            }
        })
        .delete(async (req, res) => {

            const { id } = req.params
            if (!id) {
                return res.status(400).send({ error: 'Post ID is missing.' })
            }

            try {
                const deletedPost = await PostsModel.deleteOne({ _id: id })

                if (deletedPost.deletedCount) {
                    return res.send('OK - Removido')
                }

                res.status(400).send({ error: 'Could not delete the post' })
            } catch (error) {
                res.send(error)
            }
        })
}

module.exports = postRoute