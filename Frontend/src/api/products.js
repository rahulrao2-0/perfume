const API_BASE_URL = "http://ec2-15-207-254-178.ap-south-1.compute.amazonaws.com/AllProducts";

/**
 * Fetch all products from backend (populated with category ObjectId reference)
 */
export async function getAllProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/AllProducts/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (getAllProducts):", error);
    throw error;
  }
}

/**
 * Fetch product details by ID from backend (populated with category ObjectId reference)
 */
export async function getProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/product/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error (getProductById - ${id}):`, error);
    throw error;
  }
}

/**
 * Fetch all categories from backend
 */
export async function getAllCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (getAllCategories):", error);
    throw error;
  }
}

/**
 * Fetch reviews for a specific product ID
 */
export async function getReviewsByProductId(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/product/${productId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error (getReviewsByProductId - ${productId}):`, error);
    throw error;
  }
}

/**
 * Submit a new review for a product to backend
 */
export async function submitReview({ productId, userName, rating, comment }) {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, userName, rating, comment }),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Failed to submit review: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (submitReview):", error);
    throw error;
  }
}
