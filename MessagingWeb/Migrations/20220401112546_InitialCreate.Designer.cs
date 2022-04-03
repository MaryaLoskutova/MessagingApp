﻿// <auto-generated />
using System;
using MessagingWeb;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MessagingWeb.Migrations
{
    [DbContext(typeof(MessageDbContext))]
    [Migration("20220401112546_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.15");

            modelBuilder.Entity("MessagingWeb.BusinessObjects.MessageDbo", b =>
                {
                    b.Property<Guid>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Phone")
                        .HasColumnType("varchar(15)");

                    b.Property<DateTimeOffset>("SendDate")
                        .HasColumnType("datetimeoffset(7)");

                    b.Property<long>("Timestamp")
                        .IsConcurrencyToken()
                        .HasColumnType("bigint");

                    b.HasKey("MessageId");

                    b.HasIndex(new[] { "MessageId" }, "Idx_MessageId")
                        .IsUnique();

                    b.ToTable("MessageHistory");
                });
#pragma warning restore 612, 618
        }
    }
}
