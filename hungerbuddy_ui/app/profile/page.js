// app/profile/page.js

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getData, postData, serverURL } from '../services/FetchNodeServices';
import { setStudentList, selectStudent } from '../storage/actions';
import styles from './profile.module.css';
import { color } from 'framer-motion';

const StudentProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const studentList = useSelector((state) => state.studentList || []);
  const selectedStudent = useSelector((state) => state.selectedStudent || null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchEnrollment, setSearchEnrollment] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const [activeSection, setActiveSection] = useState('profile');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('USER');
      if (raw) {
        const parsed = JSON.parse(raw);
        setLoggedInUser(Object.values(parsed)[0] || null);
      }
    } catch (e) {
      console.error('USER parse error:', e);
    }
  }, []);

  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      const response = await getData('student/fetch_all_student');

      if (response.status) {
        dispatch(setStudentList(response.data));
        if (response.data && response.data.length > 0) {
          let target = response.data[0];
          if (loggedInUser && loggedInUser.enrollmentno) {
            const match = response.data.find(
              (s) => String(s.enrollmentno) === String(loggedInUser.enrollmentno)
            );
            if (match) target = match;
          }
          dispatch(selectStudent(target));
          setFormData(target);
          setSearchEnrollment(target.enrollmentno || '');
        }
        setError(null);
      } else {
        setError(response.message || 'Failed to fetch students');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const ordersFetchedFor = React.useRef(null);

  const fetchOrders = async () => {
    const enrollment =
      loggedInUser?.enrollmentno ||
      formData?.enrollmentno ||
      selectedStudent?.enrollmentno;

    if (!enrollment) {
      setOrdersError('No enrollment number found. Please login again.');
      return;
    }

    try {
      setOrdersLoading(true);
      setOrdersError(null);
      const res = await postData('users/fetch_orders_by_enrollment', {
        enrollmentno: enrollment
      });

      if (res.status) {
        const grouped = {};
        (res.data || []).forEach((row) => {
          if (!grouped[row.orderid]) {
            grouped[row.orderid] = {
              orderid: row.orderid,
              delivery_status: row.delivery_status,
              payment_type: row.payment_type,
              paymentid: row.paymentid,
              items: [],
              total: 0
            };
          }
          grouped[row.orderid].items.push(row);
          grouped[row.orderid].total += Number(row.amount) || 0;
        });
        setOrders(Object.values(grouped));
        ordersFetchedFor.current = String(enrollment);
      } else {
        setOrdersError(res.message || 'Failed to load orders');
      }
    } catch (e) {
      console.error('Orders error:', e);
      setOrdersError(e.message || 'Error loading orders');
    } finally {
      setOrdersLoading(false);
    }
  };

  const enrollmentKey =
    loggedInUser?.enrollmentno ||
    selectedStudent?.enrollmentno ||
    null;

  useEffect(() => {
    if (enrollmentKey && ordersFetchedFor.current !== String(enrollmentKey)) {
      fetchOrders();
    }
  }, [enrollmentKey]);

  useEffect(() => {
    if (
      activeSection === 'orders' &&
      enrollmentKey &&
      ordersFetchedFor.current !== String(enrollmentKey)
    ) {
      fetchOrders();
    }
  }, [activeSection]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('USER');
      localStorage.removeItem('Token');
    }
    dispatch({ type: 'EMPTY_CART' });
    dispatch({ type: 'USER_LOGOUT' });
    router.push('/homepage');
  };

  const fetchStudentByEnrollment = async () => {
    if (!searchEnrollment.trim()) {
      alert('Please enter Enrollment No');
      return;
    }

    try {
      setSearchLoading(true);
      const response = await postData('student/fetch_student_by_enrollment', {
        enrollmentno: searchEnrollment.trim()
      });

      if (response.status) {
        dispatch(selectStudent(response.data));
        setFormData(response.data);
        setIsEditing(false);
        setError(null);
        alert('✅ Student found: ' + response.data.studentname);
      } else {
        alert('❌ ' + (response.message || 'Student not found'));
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Error searching student');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleStudentSelect = (studentId) => {
    const student = studentList.find(s => s.studentid === studentId);
    if (student) {
      dispatch(selectStudent(student));
      setFormData(student);
      setIsEditing(false);
      setSearchEnrollment(student.enrollmentno || '');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(selectedStudent);
    setSearchEnrollment(selectedStudent?.enrollmentno || '');
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (!formData.enrollmentno) {
        alert('❌ Enrollment No not found!');
        setLoading(false);
        return;
      }

      const updateData = {
        enrollmentno: formData.enrollmentno,
        studentname: formData.studentname || '',
        fathername: formData.fathername || '',
        mobileno: formData.mobileno || '',
        emailid: formData.emailid || '',
        gender: formData.gender || '',
        current_state: formData.current_state || '',
        current_city: formData.current_city || '',
        current_pincode: formData.current_pincode || '',
        current_address: formData.current_address || ''
      };

      const response = await postData('student/edit_students', updateData);

      if (response.status) {
        const updatedList = studentList.map(student =>
          student.enrollmentno === formData.enrollmentno ? formData : student
        );
        dispatch(setStudentList(updatedList));
        dispatch(selectStudent(formData));
        setIsEditing(false);
        alert('✅ Student updated successfully!');
      } else {
        alert('❌ ' + (response.message || 'Failed to update student'));
      }
    } catch (err) {
      console.error('Error updating student:', err);
      alert('❌ Error updating student: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'S';
    return name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  const completeness = useMemo(() => {
    const fields = ['studentname', 'fathername', 'mobileno', 'emailid', 'gender', 'current_state', 'current_city', 'current_pincode', 'current_address'];
    const filled = fields.filter(f => formData[f] && String(formData[f]).trim() !== '').length;
    return Math.round((filled / fields.length) * 100);
  }, [formData]);

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItems = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + (Number(i.qty) || 0), 0), 0);

  const studentData = formData;

  const renderStatusBadge = (status) => {
    const s = String(status || '').toLowerCase();
    if (s.includes('deliver') && !s.includes('not')) return <span className={`${styles.statusBadge} ${styles.delivered}`}>✓ Delivered</span>;
    if (s.includes('not')) return <span className={`${styles.statusBadge} ${styles.pending}`}>⏳ Not Delivered</span>;
    return <span className={`${styles.statusBadge} ${styles.pending}`}>{status || 'Unknown'}</span>;
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>🍔</span>
          <span className={styles.brandName}>HungerBuddy</span>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${activeSection === 'profile' ? styles.navActive : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            <span className={styles.navIcon}>👤</span> Student Profile
          </button>
          <button
            className={`${styles.navItem} ${activeSection === 'orders' ? styles.navActive : ''}`}
            onClick={() => setActiveSection('orders')}
          >
            <span className={styles.navIcon}>📦</span> My Orders
          </button>
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <span className={styles.navIcon}>🚪</span> Logout
        </button>
      </aside>

      <main className={styles.main}>
        {activeSection === 'profile' ? (
          <>
            {loading && !selectedStudent ? (
              <div className={styles.centerCard}>
                <div className={styles.spinner}></div>
                <p>Loading your dashboard...</p>
              </div>
            ) : error && !selectedStudent ? (
              <div className={styles.centerCard}>
                <div className={styles.bigIcon}>⚠️</div>
                <h2>Something went wrong</h2>
                <p>{error}</p>
                <button onClick={fetchAllStudents} className={styles.primaryBtn}>Try Again</button>
              </div>
            ) : !selectedStudent || studentList.length === 0 ? (
              <div className={styles.centerCard}>
              
                <h2>No students found</h2>
                <button onClick={fetchAllStudents} className={styles.primaryBtn}>Refresh</button>
              </div>
            ) : (
              <>
                <section className={styles.hero}>
                  <div className={styles.heroCover}>
                   <div className={styles.coverContent}>
  <h1 style={{ 
    color: '#fff', 
    fontSize: '3rem',        // ✅ Title ka size badhaya
    fontWeight: '700',
    
  }}>
    Student Profile
  </h1>
  <h2 style={{ 
    color: '#FFF', 
    fontSize: '2.5rem',        // ✅ Name ka size badhaya
    fontWeight: '700'
  }}>
    {studentData.studentname || 'Student'}
  </h2>
</div>
                  </div>
                  <div className={styles.heroContent}>
                    <div className={styles.avatar}>{getInitials(studentData.studentname)}</div>
                    <div className={styles.heroInfo}>
                      <span className={styles.enrollChip}>🎓 {studentData.enrollmentno}</span>
                      <div className={styles.heroTags}>
                        {(studentData.city_name || studentData.current_city) && (
                          <span className={styles.tag}>📍 {studentData.city_name || studentData.current_city}</span>
                        )}
                        {studentData.gender && <span className={styles.tag}>{studentData.gender}</span>}
                        {studentData.mobileno && <span className={styles.tag}>📞 {studentData.mobileno}</span>}
                      </div>
                    </div>
                    <div className={styles.heroActions}>
                      {!isEditing ? (
                        <button onClick={handleEdit} className={styles.primaryBtn}>✏️ Edit Profile</button>
                      ) : (
                        <>
                          <button onClick={handleSave} disabled={loading} className={styles.successBtn}>
                            {loading ? 'Saving...' : '💾 Save'}
                          </button>
                          <button onClick={handleCancel} className={styles.dangerBtn}>Cancel</button>
                        </>
                      )}
                    </div>
                  </div>
                </section>

                <section className={styles.statsRow}>
                  <div className={`${styles.statCard} ${styles.statGreen}`}>
                    <div className={styles.statIcon}>📊</div>
                    <div className={styles.statProgressWrap}>
                      <span className={styles.statValue}>{completeness}%</span>
                      <span className={styles.statLabel}>Profile Complete</span>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${completeness}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.statCard} ${styles.statBlue}`}>
                    <div className={styles.statIcon}>📦</div>
                    <div>
                      <span className={styles.statValue}>{orders.length}</span>
                      <span className={styles.statLabel}>Total Orders</span>
                    </div>
                  </div>

                  <div className={`${styles.statCard} ${styles.statOrange}`}>
                    <div className={styles.statIcon}>🛒</div>
                    <div>
                      <span className={styles.statValue}>{totalItems}</span>
                      <span className={styles.statLabel}>Items Ordered</span>
                    </div>
                  </div>

                  <div className={`${styles.statCard} ${styles.statPurple}`}>
                    <div className={styles.statIcon}>💰</div>
                    <div>
                      <span className={styles.statValue}>₹{totalSpent}</span>
                      <span className={styles.statLabel}>Total Spent</span>
                    </div>
                  </div>
                </section>

                <div className={styles.contentGrid}>
                  <section className={styles.panel}>
                    <div className={styles.panelHeader}>
                      <h2>👤 Personal Information</h2>
                      {isEditing && <span className={styles.editingBadge}>Editing</span>}
                    </div>

                    <div className={styles.fieldGrid}>
                      <label className={styles.fieldBox}>
                        <span>Enrollment No</span>
                        <input type="text" name="enrollmentno" value={studentData.enrollmentno || ''} disabled />
                      </label>

                      <label className={styles.fieldBox}>
                        <span>Name</span>
                        <input type="text" name="studentname" value={studentData.studentname || ''} onChange={handleInputChange} disabled={!isEditing} placeholder="Enter Name" />
                      </label>

                      <label className={styles.fieldBox}>
                        <span>Father&apos;s Name</span>
                        <input type="text" name="fathername" value={studentData.fathername || ''} onChange={handleInputChange} disabled={!isEditing} placeholder="Enter Father's Name" />
                      </label>

                      <label className={styles.fieldBox}>
                        <span>Mobile No</span>
                        <input type="tel" name="mobileno" value={studentData.mobileno || ''} onChange={handleInputChange} disabled={!isEditing} placeholder="Enter Mobile No" />
                      </label>

                      <label className={styles.fieldBox}>
                        <span>Email ID</span>
                        <input type="email" name="emailid" value={studentData.emailid || ''} onChange={handleInputChange} disabled={!isEditing} placeholder="Enter Email" />
                      </label>

                      <label className={styles.fieldBox}>
                        <span>Gender</span>
                        <input type="text" name="gender" value={studentData.gender || ''} onChange={handleInputChange} disabled={!isEditing} placeholder="Enter Gender" />
                      </label>
                    </div>
                  </section>

                  <aside className={styles.sideColumn}>
                    <section className={styles.panel}>
                      <div className={styles.panelHeader}>
                        <h2>📍 Address Details</h2>
                      </div>

                      <div className={styles.fieldGridSingle}>
                        <label className={styles.fieldBox}>
                          <span>State</span>
                          <input
                            type="text"
                            name="current_state"
                            value={isEditing ? studentData.current_state || '' : studentData.state_name || studentData.current_state || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter State"
                          />
                          {!isEditing && studentData.state_name && (
                            <small>ID: {studentData.current_state}</small>
                          )}
                        </label>

                        <label className={styles.fieldBox}>
                          <span>City</span>
                          <input
                            type="text"
                            name="current_city"
                            value={isEditing ? studentData.current_city || '' : studentData.city_name || studentData.current_city || ''}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter City"
                          />
                          {!isEditing && studentData.city_name && (
                            <small>ID: {studentData.current_city}</small>
                          )}
                        </label>

                        <label className={styles.fieldBox}>
                          <span>Pincode</span>
                          <input type="text" name="current_pincode" value={studentData.current_pincode || ''} onChange={handleInputChange} disabled={!isEditing} placeholder="Enter Pincode" />
                        </label>

                        <label className={styles.fieldBox}>
                          <span>Current Address</span>
                          <textarea name="current_address" value={studentData.current_address || ''} onChange={handleInputChange} rows={3} disabled={!isEditing} placeholder="Enter Current Address" />
                        </label>
                      </div>
                    </section>

                    {studentList.length > 1 && (
                      <section className={styles.panel}>
                        <div className={styles.panelHeader}>
                          <h2>🔄 Switch Student</h2>
                          <span className={styles.countBadge}>{studentList.length}</span>
                        </div>
                        <select
                          className={styles.selector}
                          value={selectedStudent.studentid || selectedStudent.enrollmentno}
                          onChange={(e) => {
                            const student = studentList.find(s =>
                              s.studentid === Number(e.target.value) ||
                              s.enrollmentno === e.target.value
                            );
                            if (student) handleStudentSelect(student.studentid);
                          }}
                        >
                          {studentList.map((student) => (
                            <option key={student.enrollmentno || student.studentid} value={student.studentid || student.enrollmentno}>
                              {student.enrollmentno} - {student.studentname}
                            </option>
                          ))}
                        </select>

                        <div className={styles.searchRow}>
                          <input
                            type="text"
                            value={searchEnrollment}
                            onChange={(e) => setSearchEnrollment(e.target.value)}
                            placeholder="Search by Enrollment No"
                            className={styles.searchInput}
                          />
                          <button onClick={fetchStudentByEnrollment} disabled={searchLoading} className={styles.searchBtn}>
                            {searchLoading ? '...' : '🔍'}
                          </button>
                        </div>
                      </section>
                    )}
                  </aside>
                </div>
              </>
            )}
          </>
        ) : (
          <section className={styles.ordersWrap}>
            <div className={styles.ordersHeader}>
              <h1>📦 My Orders</h1>
              <button onClick={fetchOrders} className={styles.refreshBtn} disabled={ordersLoading}>
                {ordersLoading ? 'Refreshing...' : '↻ Refresh'}
              </button>
            </div>

            {ordersLoading && orders.length === 0 ? (
              <div className={styles.centerCard}>
                <div className={styles.spinner}></div>
                <p>Loading your orders...</p>
              </div>
            ) : ordersError ? (
              <div className={styles.centerCard}>
                <div className={styles.bigIcon}>⚠️</div>
                <h2>Could not load orders</h2>
                <p>{ordersError}</p>
                <button onClick={fetchOrders} className={styles.primaryBtn}>Try Again</button>
              </div>
            ) : orders.length === 0 ? (
              <div className={styles.centerCard}>
                <div className={styles.bigIcon}>🛍️</div>
                <h2>No orders yet</h2>
                <p>You haven&apos;t placed any orders. Explore delicious food!</p>
                <button onClick={() => router.push('/homepage')} className={styles.primaryBtn}>Browse Food</button>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {orders.map((order) => (
                  <div key={order.orderid} className={styles.orderCard}>
                    <div className={styles.orderHead}>
                      <div className={styles.orderHeadLeft}>
                        <span className={styles.orderId}>Order #{order.orderid}</span>
                        {renderStatusBadge(order.delivery_status)}
                      </div>
                      <div className={styles.orderHeadRight}>
                        <span className={styles.orderCount}>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                        <span className={styles.orderTotal}>₹{order.total}</span>
                      </div>
                    </div>

                    <div className={styles.orderItems}>
                      {order.items.map((item, idx) => (
                        <div key={idx} className={styles.orderItem}>
                          <div className={styles.itemImgWrap}>
                           
                            {item.picture && (
                              <img
                                className={styles.itemImg}
                                src={`${serverURL}/images/${item.picture}`}
                                alt={item.fooditemname}
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            )}
                          </div>
                          <div className={styles.itemInfo}>
                            <span className={styles.itemName}>{item.fooditemname}</span>
                            <span className={styles.itemSub}>
                              Qty: {item.qty} × ₹{Number(item.offerprice) > 0 ? item.offerprice : item.fullprice}
                            </span>
                          </div>
                          <span className={styles.itemPrice}>₹{item.amount}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.orderFoot}>
                      <span>💳 Payment: {order.payment_type || 'Online'}</span>
                      {order.paymentid && <span className={styles.payId}>Payment ID: {order.paymentid}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default StudentProfile;
