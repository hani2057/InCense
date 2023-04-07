package com.suyang.incense.db.repository.brand;


import com.suyang.incense.db.entity.perfume.Brand;

import java.util.List;

public interface BrandCustomRepository {

    public List<Brand> getBrandList();
    public List<Brand> getNotInBrandList(List<Long> brandList);


}
