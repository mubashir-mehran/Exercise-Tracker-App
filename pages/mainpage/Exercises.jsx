import exercise from '@/styles/Exercise.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export default function Exercises() {
    return (
      <div className={exercise.exercise} id="exercise">
        <h1>Click To Start Your Exercise Activity</h1>
        <ul>
          <li>Running</li>
          <li>Bicycle</li>
          <li>Riding</li>
          <li>Swimming</li>
          <li>Walking</li>
          <li>Hiking</li>
        </ul>
        <div className={exercise.container}>
         <Link href='/activity'><div className={exercise.item}>
            <Image className={exercise.img} src="/running.jpg" alt="" width= {350} height={250}/>
            <h3>Running</h3>
          </div> </Link> 
          <Link href='/activity'><div className={exercise.item}>
            <Image className={exercise.img} src="/cycling.jpg" alt="" width= {350} height={250} />
            <h3>Cycling</h3>
          </div> </Link>
          <Link href='/activity'>  <div className={exercise.item}>
            <Image className={exercise.img} src="/ridding.jpg" alt="" width= {350} height={250}/>
            <h3>Riding</h3>
          </div> </Link>
          <Link href='/activity'>  <div className={exercise.item}>
            <Image className={exercise.img} src="/swimming.jpg" alt=""width= {350} height={250} />
            <h3>Swimming</h3>
          </div></Link>
          <Link href='/activity'>  <div className={exercise.item}>
            <Image className={exercise.img} src="/walk.jpg" alt="" width= {350} height={250}/>
            <h3>Walking</h3>
          </div></Link>
          <Link href='/activity'>  <div className={exercise.item}>
            <Image className={exercise.img} src="/Hiking.jpg" alt="" width='350' height="250" />
            <h3>Hiking</h3>
          </div> </Link>
        </div>
      </div>
    )
  }