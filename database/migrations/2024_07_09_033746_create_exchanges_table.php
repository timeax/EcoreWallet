<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exchanges', function (Blueprint $table) {
            $table->id();
            $table->string('from');
            $table->string('user_id');
            $table->string('transaction_id');
            $table->string('type');
            $table->double('amount');
            $table->double('charges');
            $table->double('total');
            $table->string('to');
            $table->double('rate');
            $table->double('limit_rate')->nullable();
            $table->string('status');
            $table->string('expire_in')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exchanges');
    }
};
