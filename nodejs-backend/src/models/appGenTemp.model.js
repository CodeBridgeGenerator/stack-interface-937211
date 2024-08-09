
    module.exports = function (app) {
        const modelName = 'app_gen_temp';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            AppStackName: { type: Schema.Types.ObjectId, ref: "stack_name" },
apptemp: { type: String, required: false , enum: ["A","B","C","D","E","F"] },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };