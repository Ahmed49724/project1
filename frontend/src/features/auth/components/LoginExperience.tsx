import Image from 'next/image'
import { AdultLoginForm } from './AdultLoginForm'
import styles from './LoginExperience.module.css'

export function LoginExperience() {
  return (
    <main className={styles.page}>
      <aside className={styles.brandPanel} aria-label="Jamea subscription benefits">
        <div className={styles.brandTop}>
          <Image src="/logo-optimized.png" alt="Jamea" width={58} height={58} priority />
          <div className={styles.brandName}>
            <strong>JAMEA</strong>
            <span>Arabic learning for families</span>
          </div>
        </div>

        <div className={styles.brandCopy}>
          <h2>تعلم عربي منظم لكل طفل</h2>
          <p>
            حساب واحد لولي الأمر أو المعلم، اشتراك شهري، ومتابعة واضحة لتقدم الأطفال في القراءة
            والحروف والأنشطة التفاعلية.
          </p>
        </div>

        <div className={styles.trustRow}>
          <div className={styles.trustItem}>
            <strong>آمن</strong>
            <span>دخول Google أو بريد إلكتروني موثق عبر Supabase.</span>
          </div>
          <div className={styles.trustItem}>
            <strong>عائلي</strong>
            <span>إدارة طلاب وأكواد دخول للأطفال من لوحة واحدة.</span>
          </div>
          <div className={styles.trustItem}>
            <strong>اشتراك</strong>
            <span>واجهة جاهزة للربط بخطة شهرية ولوحة تحكم.</span>
          </div>
        </div>
      </aside>

      <section className={styles.formPanel}>
        <div className={styles.formStack}>
          <div className={styles.mobileBrand}>
            <Image src="/logo-optimized.png" alt="" width={44} height={44} priority />
            <span>JAMEA PLATFORM</span>
          </div>

          <AdultLoginForm />

          <p className={styles.terms}>
            بالمتابعة أنت توافق على <a href="/terms">شروط الاستخدام</a> و <a href="/privacy">سياسة الخصوصية</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
