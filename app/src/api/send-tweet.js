import * as anchor from '@project-serum/anchor';
import { useWorkspace } from '@/composables'
import { Tweet } from '@/models'

export const sendTweet = async (topic, content) => {

    console.log(anchor.web3.SystemProgram)
    const { wallet, program } = useWorkspace()
    const tweet = anchor.web3.Keypair.generate()

    await program.value.rpc.sendTweet(topic, content, {
        accounts: {
            author: wallet.value.publicKey,
            tweet: tweet.publicKey,
            systemProgram:  anchor.web3.SystemProgram.programId, 
          
        },
        signers: [tweet]
    })

    const tweetAccount = await program.value.account.tweet.fetch(tweet.publicKey)
    return new Tweet(tweet.publicKey, tweetAccount)
}