/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"export",
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: 'raw-loader',
    });

    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf|png|jpg|gif|svg|pdf|node)$/,        
      use: [
        {
          // loader: 'file-loader',
          options: {
            outputPath: './pages', // Output directory for the files
            publicPath: '/_next/static', // Public URL path for the files
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;

module.exports = {
  env: {
    RAZORPAY_KEY: 'rzp_test_HVZCFfDTz5rdFC',
    RAZORPAY_SECRET: 'MW4HqApp2RICQ9sV7fihqI6o',
  },
};
