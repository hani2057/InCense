package com.suyang.incense.db.repository.brand;

import com.suyang.incense.db.entity.perfume.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brand,Long>,BrandCustomRepository {
}
