// restaurantUtils.js
class RestaurantUtils {
    static sortRestaurants(restaurants, sortBy) {
        switch (sortBy) {
            case 'rating':
                return restaurants.sort((a, b) => b.rating - a.rating);
            case 'distance':
                return restaurants.sort((a, b) => a.distance - b.distance);
            default:
                return restaurants;
        }
    }

    static paginateRestaurants(restaurants, page, limit) {
        const start = page * limit;
        return restaurants.slice(start, start + limit);
    }

    static filterRestaurants(restaurants, filters) {
        return restaurants.filter(restaurant => {
            const isOpenFilter = filters.isOpen != null ? (filters.isOpen === 'true' ? restaurant.open === true : true) : true;
            const cuisineFilter = filters.cuisine ? restaurant.cuisines.split(', ').includes(filters.cuisine) : true;
            return isOpenFilter && cuisineFilter;
        });
    }
}

module.exports = RestaurantUtils;
