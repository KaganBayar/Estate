# Estate Management System - Technical Design

Bu döküman, emlak yönetim sisteminin mimari kararlarını, veri modellemesini ve teknik yapısını özetler.

## 1. Mimari Genel Bakış

Proje, **Clean Architecture** (Temiz Mimari) prensipleri üzerine inşa edilmiştir. Bu yaklaşım, iş mantığını (business logic) dış araçlardan (veritabanı, framework, UI) bağımsız kılarak sürdürülebilirliği ve test edilebilirliği artırır.

### Katmanlar

*   **Domain (Alan):** En iç katmandır. İş kurallarını (Entities) ve depo arayüzlerini (Repository Interfaces) içerir. Hiçbir dış kütüphaneye bağımlılığı yoktur.
*   **Application (Uygulama):** Kullanım senaryolarını (Use Cases) barındırır. Domain katmanını kullanarak iş akışlarını yönetir.
*   **Infrastructure (Altyapı):** Dış dünya ile iletişim kuran katmandır. Veritabanı implementasyonları (Mongoose), servis entegrasyonları burada yer alır.
*   **Presentation (Sunum):** API uç noktalarını (Controllers) ve veri transfer nesnelerini (DTOs) içerir.

## 2. Teknoloji Yığını

*   **Backend:** NestJS (TypeScript)
*   **Database:** MongoDB (Mongoose ODM)
*   **Frontend:** Nuxt 3 (Vue 3, Pinia)
*   **Testing:** Jest & Supertest

## 3. Veri Modeli

### Entities
*   **Agency:** Ofis bilgilerini ve toplam kazancı yönetir.
*   **Agent:** Danışman bilgilerini ve bireysel komisyonları tutar.
*   **Property:** Mülk detaylarını ve durumunu (Satılık, Satıldı vb.) saklar.
*   **Transaction:** Satış sürecini, tarafları ve finansal dağılımı yönetir.

## 4. Temel İş Akışları

### Finansal Dağılım ve Komisyon Hesaplama
İşlem aşaması `Closed` (Kapandı) olarak güncellendiğinde sistem otomatik olarak:
1. Toplam komisyonu hesaplar.
2. Ofis payını (%X) ayırır.
3. Listeleme ve satış danışmanları arasında paylaştırır.
4. İlgili bakiyeleri günceller.

## 5. Repository Deseni

Veritabanı işlemlerinde `BaseRepository` soyutlaması kullanılarak kod tekrarı önlenmiş ve standart bir CRUD yapısı oluşturulmuştur.
*   Modern Mongoose standartları (`returnDocument: 'after'`) uygulanmıştır.
*   Referanslı dokümanlar için otomatik `populate` mekanizmaları kurulmuştur.

## 6. Frontend Yapısı

*   **Dashboard:** İşlem özetleri ve genel istatistikler.
*   **Modüler Bileşenler:** Finansal döküm modalleri ve dinamik tablolar.
*   **State Management:** Pinia store'ları ile merkezi veri yönetimi.

---
*Son Güncelleme: Nisan 2026*
