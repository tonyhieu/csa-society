import {useState, useEffect} from 'react';
import Layout from '../components/Layout';
import { TOPICS } from '../lib/global';
import cn from 'classnames';
import styles from '../styles/Search.module.css';
import { getAllPostDataFlat } from '../lib/postdata';
import Link from 'next/link';

export default function Search({ posts }){
    
    const dict = {}
    const [units, setUnits] = useState(dict);
    
    const getReleventPosts = () => {
        console.log()
        const searchTerms = Object.keys(units).filter((key) => units[key]);
        return posts.filter((post) => {
            if(!searchTerms.includes(post.unit.toString())){
                return false;
            }
            return true;
        });
    }

    const releventPosts = getReleventPosts();

    return (
        <Layout>
            <div className={styles.container}>
                
                <div className={styles.searchParams}>
                    <div className={styles.units}>
                        {
                            "Unit ".repeat(10).split(" ", 10).map((unit, i) => {
                                return (
                                    <div className={cn({[styles.disabled]:!units[i+1], [styles.unit]:true})} onClick={() => setUnits({...units, [i+1]:!units[i+1]})}>
                                        <small>{unit + " " + (i+1)}</small>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                    {/* <div className={styles.topics}>
                        {
                            TOPICS.map((topic) => {
                                return (
                                    <div className={cn({[styles.disabled]:!units[topic], [styles.unit]:true})} onClick={() => setUnits({...units, [topic]:!units[topic]})}>
                                        <small>{topic}</small>
                                    </div>
                                )
                            })
                        }
                    </div> */}
                </div>

                <div className={styles.posts}>
                        {
                            releventPosts.length > 0 ? releventPosts.map((post) => {
                                return (
                                    <div className={styles.postBody}>
                                        <Link href={`/${post.topic}/${post.id}`}><p className={styles.postTitle}>{post.title}</p></Link>
                                    </div>
                                )
                            }) : 
                            <p className={styles.noPosts}> No posts found...</p>
                        }
                </div>


            </div>
        </Layout>
    )
}


export async function getStaticProps() {
    const posts = getAllPostDataFlat();
    return {
        props: {
            posts
        }
    }
}